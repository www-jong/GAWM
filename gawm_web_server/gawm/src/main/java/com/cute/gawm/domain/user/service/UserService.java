package com.cute.gawm.domain.user.service;



import com.cute.gawm.common.exception.DataNotFoundException;
import com.cute.gawm.common.exception.UserNotFoundException;
import com.cute.gawm.common.exception.UserNotMatchException;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.bookmark.repository.BookmarkRepository;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.repository.ClothesDetailRepository;
import com.cute.gawm.domain.clothes.repository.ClothesRepository;
import com.cute.gawm.domain.clothes_stylelog.repository.ClothesStylelogRepository;
import com.cute.gawm.domain.comment.repository.CommentRepository;
import com.cute.gawm.domain.following.repository.FollowerRepository;
import com.cute.gawm.domain.following.repository.FollowingRepository;
import com.cute.gawm.domain.following.service.FollowService;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.lookbook.repository.LookbookRepository;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import com.cute.gawm.domain.stylelog.repository.StylelogRepository;
import com.cute.gawm.domain.tag_lookbook.repository.TagLookbookRepository;
import com.cute.gawm.domain.user.dto.UserEditForm;
import com.cute.gawm.domain.user.dto.UserInfoDto;
import com.cute.gawm.domain.user.dto.UserSummaryInfoDto;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.Comparator;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final FollowingRepository followingRepository;
    private final FollowerRepository followerRepository;
    private final LookbookRepository lookbookRepository;
    private final S3Uploader s3Uploader;
    private final FollowService followService;


    private static final Integer maxByteLength = 24;

    public User findOne(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            throw new DataNotFoundException("해당 유저가 존재하지 않습니다");
        }
        return user.get();
    }

    public boolean validateUserExistence(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            log.error("[validateUserExistence] 존재하지 않은 유저{}가 있습니다.",userId);
            return false;
        }
        return true;
    }

    public boolean validateUserExistence(User user) {
        if (user == null) {
            return false;
        }
        return true;
    }

    public UserInfoDto getUserInfo(Integer userId) {
        UserInfoDto userInfoDto = new UserInfoDto(findOne(userId));
        userInfoDto.setFollowing_num(followingRepository.findByUserId(userId).getFollowingList().size());
        userInfoDto.setFollower_num(followerRepository.findByUserId(userId).getFollowerList().size());
        return userInfoDto;
    }

    @Transactional
    public void updateMember(Integer userId, UserEditForm form) throws IOException {
        User user = userRepository.findById(userId).get();
        user.update(form);

    }

    @Transactional
    public void updateNickname(Integer userId, String nickname) throws IOException {
        if (!validateNickname(nickname)) {
            throw new IllegalArgumentException("올바르지 않은 닉네임입니다.");
        }
        User user = userRepository.findById(userId).get();
        user.updateNickname(nickname);
    }

    @Transactional
    public String updateProfileImg(Integer userId, MultipartFile multipartFile) throws IOException {
        User user = findOne(userId);

        deleteExistingProfileImg(user);

        String profileImg = s3Uploader.uploadFile(multipartFile);
        user.updateProfileImge(profileImg);
        return profileImg;
    }

    private void deleteExistingProfileImg(User user) {
        if (user.getProfileImg() != null) {
            s3Uploader.deleteFile(user.getProfileImg());
        }
    }

    public PagingResponse search(int sessionUserId, String keyword, int page, int size, Sort sort) {
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<User> userPage = userRepository.findByNicknameContainingAndUserIdNot(keyword, sessionUserId, pageable);
        List<UserSummaryInfoDto> userSummaryInfos = userPage.getContent().stream()
                .filter(user -> validateUserExistence(user))
                .map(user -> {
                    int followerCount = followService.getFollowerCount(user.getUserId());
                    int followingCount = followService.getFollowingCount(user.getUserId());
                    boolean isFollowing = followService.isFollowing(sessionUserId, user.getUserId());
                    int lookbook_num = lookbookRepository.countByUserUserId(user.getUserId());
                    return new UserSummaryInfoDto(user, lookbook_num, followerCount, followingCount, isFollowing);
                })
                .collect(Collectors.toList());

        boolean isSorted = userPage.getSort().isSorted();
        boolean isAscending = false;

        for (Sort.Order order : userPage.getSort()) {
            isAscending = order.isAscending();
            break;  // Break after checking the first order
        }
        return new PagingResponse(
                HttpStatus.OK.value(),
                userSummaryInfos,
                userPage.isFirst(),
                userPage.isLast(),
                userPage.getNumber(),
                userPage.getTotalPages(),
                userPage.getSize(),
                isSorted,
                isAscending,
                false
        );
    }

    public PagingResponse getFollowings(int sessionUserId, int page, int size, String sortBy, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = sortBy != null ? Sort.by(direction, sortBy) : Sort.unsorted();
        Pageable pageable = PageRequest.of(page, size, sort);

        List<Integer> followingList = followService.getOrCreateFollowing(sessionUserId).getFollowingList();
        List<UserSummaryInfoDto> userSummaryInfos = followingList.stream()
                .filter(userId -> validateUserExistence(userId))
                .map(userId -> {
                    User user = userRepository.findById(userId).get();
                    int followerCount = followService.getFollowerCount(user.getUserId());
                    int followingCount = followService.getFollowingCount(user.getUserId());
                    boolean isFollowing = followService.isFollowing(sessionUserId, user.getUserId());
                    int lookbook_num = lookbookRepository.countByUserUserId(user.getUserId());
                    return new UserSummaryInfoDto(user, lookbook_num, followerCount, followingCount, isFollowing);
                })
                .sorted(Comparator.comparing(userSummaryInfoDto -> userSummaryInfoDto.getNickname()))
                .collect(Collectors.toList());


        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), userSummaryInfos.size());
        int totalPage = (userSummaryInfos.size() + size - 1) / size;
        boolean sorted = true;
        boolean asc = true;
        boolean first = start == 0;
        boolean last = page == totalPage - 1;
        if (sortBy.equals("nickname")) {
            userSummaryInfos = userSummaryInfos.stream()
                    .sorted(Comparator.comparing(UserSummaryInfoDto::getNickname, String.CASE_INSENSITIVE_ORDER))
                    .collect(Collectors.toList());
        }
        if (direction == Sort.Direction.DESC) {
            Collections.reverse(userSummaryInfos);
            asc = false;
        }
        userSummaryInfos = userSummaryInfos.subList(start, end);

        return new PagingResponse(
                HttpStatus.OK.value(),
                userSummaryInfos,
                first,
                last,
                page,
                totalPage,
                size,
                sorted,
                asc,
                false
        );
    }

    public PagingResponse getFollowers(int sessionUserId, int page, int size, String sortBy, String sortDirection) {
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = sortBy != null ? Sort.by(direction, sortBy) : Sort.unsorted();
        Pageable pageable = PageRequest.of(page, size, sort);

        List<Integer> followerList = followService.getOrCreateFollower(sessionUserId).getFollowerList();
        List<UserSummaryInfoDto> userSummaryInfos = followerList.stream()
                .filter(userId -> validateUserExistence(userId))
                .map(userId -> {
                    User user = userRepository.findById(userId).get();
                    int followerCount = followService.getFollowerCount(user.getUserId());
                    int followingCount = followService.getFollowingCount(user.getUserId());
                    boolean isFollowing = followService.isFollowing(sessionUserId, user.getUserId());
                    int lookbook_num = lookbookRepository.countByUserUserId(user.getUserId());
                    return new UserSummaryInfoDto(user, lookbook_num, followerCount, followingCount, isFollowing);
                })
                .sorted(Comparator.comparing(userSummaryInfoDto -> userSummaryInfoDto.getNickname()))
                .collect(Collectors.toList());

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), userSummaryInfos.size());
        int totalPage = (userSummaryInfos.size() + size - 1) / size;
        boolean sorted = true;
        boolean asc = true;
        boolean first = start == 0;
        boolean last = page == totalPage - 1;
        if (sortBy.equals("nickname")) {
            userSummaryInfos = userSummaryInfos.stream()
                    .sorted(Comparator.comparing(UserSummaryInfoDto::getNickname, String.CASE_INSENSITIVE_ORDER))
                    .collect(Collectors.toList());
        }
        if (direction == Sort.Direction.DESC) {
            Collections.reverse(userSummaryInfos);
            asc = false;
        }
        userSummaryInfos = userSummaryInfos.subList(start, end);

        return new PagingResponse(
                HttpStatus.OK.value(),
                userSummaryInfos,
                first,
                last,
                page,
                totalPage,
                size,
                sorted,
                asc,
                false
        );
    }

    private boolean validateNickname(String nickname) {
        String regex = "^[a-z|A-Z|가-힣| |_|0-9]*$";
        byte[] bytes = nickname.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        return userRepository.findByNickname(nickname).isEmpty()
                && bytes.length <= maxByteLength
                && Pattern.matches(regex, nickname)
                && !nickname.contains("  ")
                && !nickname.endsWith(" ")
                && !nickname.startsWith(" ");
    }

    public void givePointToBestUser(int sessionUserId,int userId, Integer point){
        if(sessionUserId==userId) throw new UserNotMatchException("해당 유저에게 포인트를 줄 수 있는 권한이 없습니다.");
        addPoint(userId,point);
        User sessionUser = userRepository.findByUserId(sessionUserId);
        sessionUser.minusPoint(point);
    }

    public void addPoint(Integer userId, Integer point) {
        User user = userRepository.findByUserId(userId);
        if(user==null) throw new UserNotFoundException("해당 유저가 존재하지 않습니다.");

        user.addPoint(point);
    }
}


