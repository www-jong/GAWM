package com.cute.gawm.domain.lookbook.service;

import com.cute.gawm.common.exception.*;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.bookmark.entity.Bookmark;
import com.cute.gawm.domain.bookmark.repository.BookmarkRepository;
import com.cute.gawm.domain.clothes.dto.response.ClothesMiniResponse;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.repository.ClothesRepository;
import com.cute.gawm.domain.clothes_lookbook.entity.ClothesLookbook;
import com.cute.gawm.domain.clothes_lookbook.repository.ClothesLookbookRepository;
import com.cute.gawm.domain.comment.dto.response.CommentResponse;
import com.cute.gawm.domain.comment.entity.Comment;
import com.cute.gawm.domain.comment.repository.CommentRepository;
import com.cute.gawm.domain.following.entity.Following;
import com.cute.gawm.domain.following.repository.FollowingRepository;
import com.cute.gawm.domain.following.service.FollowService;
import com.cute.gawm.domain.like.entity.Likes;
import com.cute.gawm.domain.like.repository.LikesRepository;
import com.cute.gawm.domain.lookbook.dto.request.LookbookCreateRequest;
import com.cute.gawm.domain.lookbook.dto.request.LookbookUpdateRequest;
import com.cute.gawm.domain.lookbook.dto.response.LookbookMiniResponse;
import com.cute.gawm.domain.lookbook.dto.response.LookbookResponse;
import com.cute.gawm.domain.lookbook.dto.response.LookbookThumbnailResponse;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.lookbook.repository.LookbookRepository;
import com.cute.gawm.domain.lookbook_image.entity.LookbookImage;
import com.cute.gawm.domain.lookbook_image.repository.LookbookImageRepository;
import com.cute.gawm.domain.tag.dto.response.TagResponse;
import com.cute.gawm.domain.tag.entity.Tag;
import com.cute.gawm.domain.tag.repository.TagRepository;
import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;
import com.cute.gawm.domain.tag_lookbook.repository.TagLookbookRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class LookbookService {
    private final LookbookRepository lookbookRepository;
    private final CommentRepository commentRepository;
    private final S3Uploader s3Uploader;
    private final ClothesLookbookRepository clothesLookbookRepository;
    private final TagLookbookRepository tagLookbookRepository;
    private final LookbookImageRepository lookbookImageRepository;
    private final UserRepository userRepository;
    private final ClothesRepository clothesRepository;
    private final TagRepository tagRepository;
    private final BookmarkRepository bookmarkRepository;
    private final FollowingRepository followingRepository;
    private final LikesRepository likesRepository;
    private final FollowService followService;

    public LookbookResponse getLookbook(final int sessionUserId,final int lookbookId) {
        User sessionUser = userRepository.findById(sessionUserId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));

        final Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 룩북은 존재하지 않습니다.");
        final List<ClothesLookbook> clotheLookbooks = clothesLookbookRepository.getAllByLookbookId(lookbookId);
        final List<TagLookbook> tagLookbooks = tagLookbookRepository.getAllByLookbookId(lookbookId);
        final List<Comment> commentList = commentRepository.getAllByLookbookId(lookbookId);
        List<LookbookImage> lookbookImages = lookbookImageRepository.findAllByLookbook_LookbookId(lookbookId);
        final User user=lookbook.getUser();

        List<ClothesMiniResponse> miniResponses = new ArrayList<>();
        clotheLookbooks.forEach(clotheLookbook -> {
            final Clothes clothes = clotheLookbook.getClothes();
            final int id = clothes.getClothesId();
            ClothesMiniResponse clotheMiniResp = ClothesMiniResponse.builder()

                    .clothesId(id)
                    .name(clothes.getName())
                    .brand(clothes.getBrand())
                    .clothesImg(clothes.getClothesImg())
                    .build();
            miniResponses.add(clotheMiniResp);
        });

        List<String> lookbookImgs=lookbookImages.stream().map(LookbookImage->LookbookImage.getImage()).collect(Collectors.toList());
        Integer likeCnt = likesRepository.countByLookbook(lookbook);

        List<TagResponse> tags=tagLookbooks.stream().map(tagLookbook -> new TagResponse(tagLookbook.getTag())).collect(Collectors.toList());

        List<CommentResponse> comments=new ArrayList<>();
        commentList.forEach(comment -> {
            CommentResponse commentResp = CommentResponse.builder()
                    .commentId(comment.getCommentId())
                    .content(comment.getContent())
                    .userNickname(comment.getUser().getNickname())
                    .userProfileImg(comment.getUser().getProfileImg())
                    .isCommentAuthor(comment.getUser().equals(sessionUser))
                    .build();
            comments.add(commentResp);
        });

        boolean isLiked=likesRepository.existsByLookbookAndUserUserId(lookbook,sessionUserId);
        boolean isBookmarked=bookmarkRepository.existsByLookbookAndUserUserId(lookbook,sessionUserId);
        boolean isFollowed=followService.isFollowing(sessionUserId,user.getUserId());

        return LookbookResponse.builder()
                .lookbookId(lookbookId)
                .userId(user.getUserId())
                .userNickname(user.getNickname())
                .userProfileImg(user.getProfileImg())
                .createdAt(lookbook.getCreatedAt())
                .clothes(miniResponses)
                .lookbookImgs(lookbookImgs)
                .likeCnt(likeCnt)
                .view(lookbook.getView())
                .tag(tags)
                .comment(comments)
                .isLiked(isLiked)
                .isBookmarked(isBookmarked)
                .isFollowed(isFollowed)
                .build();
    }

    @Transactional
    public void createLookbook(Integer userId, List<MultipartFile> images, LookbookCreateRequest lookbookRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));

        Lookbook lookbook = Lookbook.builder()
                .user(user)
                .view(0)
                .isPublic(lookbookRequest.isPublic())
                .build();
        lookbookRepository.save(lookbook);

        images.forEach(img -> {
            String name = s3Uploader.uploadFile(img);
            LookbookImage lookbookImage = LookbookImage.builder()
                    .image(name)
                    .lookbook(lookbook)
                    .build();
            lookbookImageRepository.save(lookbookImage);
        });

        lookbookRequest.getClothes().forEach(clotheId -> {
            ClothesLookbook clothesLookbook = ClothesLookbook.builder()
                    .lookbook(lookbook)
                    .clothes(clothesRepository.findById(clotheId).orElseThrow(() -> new ClothesNotFoundException("해당 옷이 존재하지 않습니다.")))
                    .build();

            clothesLookbookRepository.save(clothesLookbook);
        });

        lookbookRequest.getTags().forEach(tagName -> {
            Tag tag=tagRepository.findByName(tagName);
            if(tag==null){
                tag = Tag.builder()
                        .name(tagName)
                        .build();
                tagRepository.save(tag);
            }
            TagLookbook tagLookbook = TagLookbook.builder()
                    .lookbook(lookbook)
                    .tag(tag)
                    .build();
            tagLookbookRepository.save(tagLookbook);
        });

        user.addPoint(10);
        userRepository.save(user);
    }

    public PagingResponse<List<LookbookThumbnailResponse>> getLookbooks(Pageable pageable) {
        Page<Lookbook> lookbooks = lookbookRepository.findAllLookbook(pageable);
        List<LookbookThumbnailResponse> lookbookResponse = new ArrayList<>();

        lookbooks.forEach(lookbook -> {
            List<LookbookImage> lookbookImage = lookbookImageRepository.findAllByLookbook_LookbookId(lookbook.getLookbookId());
            List<String> ImageUrls=lookbookImage.stream().map(Image-> Image.getImage()).collect(Collectors.toList());
            Integer likeCnt=likesRepository.countByLookbook(lookbook);
            User user=lookbook.getUser();
            LookbookThumbnailResponse build = LookbookThumbnailResponse.builder()
                    .lookbookId(lookbook.getLookbookId())
                    .createdAt(lookbook.getCreatedAt())
                    .likeCnt(likeCnt)
                    .userNickname(user.getNickname())
                    .userProfileImg(user.getProfileImg())
                    .images(ImageUrls)
                    .build();
            lookbookResponse.add(build);
        });

        return new PagingResponse(
                HttpStatus.OK.value(),
                lookbookResponse,
                lookbooks.isFirst(),
                lookbooks.isLast(),
                lookbooks.getPageable().getPageNumber(),
                lookbooks.getTotalPages(),
                lookbooks.getSize(),
                false,
                false,
                false
        );
    }

    @Transactional
    public void updateLookbook(Integer userId, Integer lookbookId, List<MultipartFile> images, LookbookUpdateRequest lookbookUpdateRequest) throws UserNotMatchException {
        Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 룩북은 존재하지 않습니다.");
        if (lookbook.getUser().getUserId() != userId) throw new UserNotMatchException("해당 유저에게 룩북 수정 권한이 존재하지 않습니다.");

        if (!images.isEmpty()) {
            List<LookbookImage> lookbookImages = lookbookImageRepository.findAllByLookbook_LookbookId(lookbookId);
            lookbookImages.forEach((lookbookImage) -> {
                s3Uploader.deleteFile(lookbookImage.getImage());
            });
            lookbookImageRepository.deleteByLookbook(lookbook);

            images.forEach((image) -> {
                String name = s3Uploader.uploadFile(image);
                LookbookImage lookbookImage = LookbookImage.builder()
                        .image(name)
                        .lookbook(lookbook)
                        .build();
                lookbookImageRepository.save(lookbookImage);
            });
        }

        if (!lookbookUpdateRequest.getClothes().isEmpty()) {
            clothesLookbookRepository.deleteAllByLookbook(lookbook);

            lookbookUpdateRequest.getClothes().forEach((clotheId) -> {
                Clothes clothe = clothesRepository.findByClothesId(clotheId);
                ClothesLookbook clothesLookbook = ClothesLookbook.builder()
                        .lookbook(lookbook)
                        .clothes(clothe)
                        .build();
                clothesLookbookRepository.save(clothesLookbook);
            });
        }

        if (!lookbookUpdateRequest.getTags().isEmpty()) {
            tagLookbookRepository.deleteByLookbookLookbookId(lookbookId);

            lookbookUpdateRequest.getTags().forEach(tagName -> {
                Tag tag=tagRepository.findByName(tagName);
                if(tag==null){
                    tag = Tag.builder()
                            .name(tagName)
                            .build();
                    tagRepository.save(tag);
                }
                TagLookbook tagLookbook = TagLookbook.builder()
                        .tag(tag)
                        .lookbook(lookbook)
                        .build();
                tagLookbookRepository.save(tagLookbook);
            });
        }
    }

    @Transactional
    public void deleteLookbook(Integer userId, Integer lookbookId) {
        Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 룩북은 존재하지 않습니다.");
        if (lookbook.getUser().getUserId() != userId) throw new UserNotMatchException("해당 유저에게 룩북 삭제 권한이 존재하지 않습니다.");

        tagLookbookRepository.deleteByLookbookLookbookId(lookbookId); //Tag-Lookbook 삭제
        commentRepository.deleteByLookbookLookbookId(lookbookId); //comment 삭제
        bookmarkRepository.deleteByLookbookLookbookId(lookbookId); //bookmark 삭제
        likesRepository.deleteByLookbookLookbookId(lookbookId); //like 삭제
        clothesLookbookRepository.deleteAllByLookbook(lookbook); //clothesLookbook삭제

        //lookbookImage 삭제
        List<LookbookImage> lookbookImages = lookbookImageRepository.findAllByLookbook_LookbookId(lookbookId);
        lookbookImages.forEach((lookbookImage) -> {
            s3Uploader.deleteFile(lookbookImage.getImage());
        });
        lookbookImageRepository.deleteByLookbook(lookbook);

        lookbookRepository.deleteByLookbookId(lookbookId);
    }

    public PageImpl<LookbookMiniResponse> getFollowingLookbooks(Integer userId, Pageable pageable) {
        Following followingList = followingRepository.findByUserId(userId);
        List<LookbookMiniResponse> responseList = new ArrayList<>();

        followingList.getFollowingList().forEach(followingId -> {
            if(userRepository.existsById(followingId)){
                List<Lookbook> lookbooks = lookbookRepository.findByUserUserId(followingId);
                lookbooks.forEach(lookbook -> {
                    List<LookbookImage> lookbookImages = lookbookImageRepository.findAllByLookbook_LookbookId(lookbook.getLookbookId());
                    LookbookMiniResponse lookbookMiniResponse = LookbookMiniResponse.builder()
                            .images(lookbookImages)
                            .createdAt(lookbook.getCreatedAt())
                            .view(lookbook.getView())
                            .userId(lookbook.getUser().getUserId())
                            .build();
                    responseList.add(lookbookMiniResponse);
                });
            }
        });
        System.out.println(responseList);
        return new PageImpl<>(responseList, pageable, responseList.size());
    }


    public PageImpl<LookbookMiniResponse> getSearchLookbook(String keyword, Pageable pageable) {
        PageImpl<Lookbook> lookbooks = lookbookRepository.searchLookbook(keyword, pageable);
        List<LookbookMiniResponse> responseList = new ArrayList<>();
        lookbooks.forEach(lookbook -> {
            List<LookbookImage> lookbookImage = lookbookImageRepository.findAllByLookbook_LookbookId(lookbook.getLookbookId());
            LookbookMiniResponse build = LookbookMiniResponse.builder()
                    .createdAt(lookbook.getCreatedAt())
                    .view(lookbook.getView())
                    .userId(lookbook.getUser().getUserId())
                    .images(lookbookImage)
                    .build();
            responseList.add(build);
        });

        return new PageImpl<>(responseList, pageable, responseList.size());
    }

    @Transactional
    public void bookmark(Integer userId, Integer lookbookId) {
        Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 룩북은 존재하지 않습니다.");
        boolean isBookmarked = bookmarkRepository.existsByLookbookAndUserUserId(lookbook, userId);
        if(isBookmarked) throw new DataMismatchException("해당 유저는 이미 북마크를 한 상태입니다.");

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
        Bookmark bookmark = Bookmark.builder()
                .lookbook(lookbook)
                .user(user)
                .build();

        bookmarkRepository.save(bookmark);
    }

    @Transactional
    public void unbookmark(Integer userId, Integer lookbookId) {
        Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 룩북은 존재하지 않습니다.");
        boolean isBookmarked = bookmarkRepository.existsByLookbookAndUserUserId(lookbook, userId);
        if(!isBookmarked) throw new DataMismatchException("해당 유저는 북마크를 하지 않은 상태입니다.");

        bookmarkRepository.deleteByLookbookLookbookId(lookbookId);
    }

    @Transactional
    public void likes(Integer userId, Integer lookbookId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해댱 유저가 존재하지 않습니다."));
        Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 룩북은 존재하지 않습니다.");
        boolean isLiked = likesRepository.existsByLookbookAndUserUserId(lookbook, userId);
        if(isLiked) throw new DataMismatchException("해당 유저는 이미 좋아요를 한 상태입니다.");
        Likes likes = Likes.builder().lookbook(lookbook).user(user).build();
        likesRepository.save(likes);
    }

    @Transactional
    public void unlikes(Integer userId, Integer lookbookId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해댱 유저가 존재하지 않습니다."));
        Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 룩북은 존재하지 않습니다.");
        boolean isLiked = likesRepository.existsByLookbookAndUserUserId(lookbook, userId);
        if(!isLiked) throw new DataMismatchException("해당 유저는 이미 좋아요를 하지 않은 상태입니다.");
        likesRepository.deleteByLookbookAndUser(lookbook, user);
    }

    public List<LookbookThumbnailResponse> getTopLookbooks() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime fiveDaysAgo = now.minusDays(5);
        Timestamp endDate = Timestamp.valueOf(now);
        Timestamp startDate = Timestamp.valueOf(fiveDaysAgo);
        List<Lookbook> topLookbooks = lookbookRepository.findTopLookbook(startDate, endDate);
        List<LookbookThumbnailResponse> responseList = new ArrayList<>();

        topLookbooks.forEach(lookbook -> {
            List<LookbookImage> lookbookImage = lookbookImageRepository.findAllByLookbook_LookbookId(lookbook.getLookbookId());
            List<String> ImageUrls=lookbookImage.stream().map(Image-> Image.getImage()).collect(Collectors.toList());
            Integer likeCnt=likesRepository.countByLookbook(lookbook);
            User user=lookbook.getUser();
            LookbookThumbnailResponse build = LookbookThumbnailResponse.builder()
                    .lookbookId(lookbook.getLookbookId())
                    .createdAt(lookbook.getCreatedAt())
                    .likeCnt(likeCnt)
                    .userNickname(user.getNickname())
                    .userProfileImg(user.getProfileImg())
                            .images(ImageUrls)
                            .build();
                    responseList.add(build);
                });
        return responseList;
    }
}
