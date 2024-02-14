package com.cute.gawm.domain.live.service;

import com.cute.gawm.common.exception.DataMismatchException;
import com.cute.gawm.common.exception.DataNotFoundException;
import com.cute.gawm.common.exception.UserNotFoundException;
import com.cute.gawm.common.exception.UserNotMatchException;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.domain.clothes.dto.response.ClothesInfoResponse;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.repository.ClothesDetailRepository;
import com.cute.gawm.domain.clothes.repository.ClothesRepository;
import com.cute.gawm.domain.following.entity.Following;
import com.cute.gawm.domain.following.repository.FollowingRepository;
import com.cute.gawm.domain.live.dto.response.LiveMiniResponse;
import com.cute.gawm.domain.live.entity.Live;
import com.cute.gawm.domain.live.repository.LiveRepository;
import com.cute.gawm.domain.lookbook.dto.response.LookbookThumbnailResponse;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class LiveService {
    private final LiveRepository liveRepository;
    private final FollowingRepository followingRepository;
    private final UserRepository userRepository;
    private final ClothesRepository clothesRepository;
    private final ClothesDetailRepository clothesDetailRepository;

    private OpenVidu openvidu;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    @PostConstruct
    public void init() {
        log.info(OPENVIDU_URL);
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public PageImpl<LiveMiniResponse> getFollowingLive(Integer userId, Pageable pageable) {
        Following followings = followingRepository.findByUserId(userId);
        List<LiveMiniResponse> liveList = new ArrayList<>();
        followings.getFollowingList().forEach(followingId -> {
            User user = userRepository.findById(followingId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
            Live live = liveRepository.findByUserAndIsDeletedFalse(user);
            if (live != null) {
                LiveMiniResponse build = LiveMiniResponse.builder()
                        .liveId(live.getLiveId())
                        .userId(user.getUserId())
                        .nickname(user.getNickname())
                        .profileImg(user.getProfileImg())
                        .name(live.getName())
                        .session(live.getSession())
                        .point(live.getPoint())
                        .createdAt(live.getCreatedAt())
                        .isPublic(live.getIsPublic())
                        .build();
                liveList.add(build);
            }
        });
        Collections.sort(liveList, Comparator.comparing(LiveMiniResponse::getCreatedAt).reversed());

        return new PageImpl<>(liveList, pageable, liveList.size());
    }

    public PagingResponse<List<LookbookThumbnailResponse>> getLiveList(Pageable pageable) {
        Page<Live> lives = liveRepository.findAll(pageable);
        List<LiveMiniResponse> liveMiniResponses = new ArrayList<>();

        lives.forEach(live -> {
            User user = live.getUser();
            LiveMiniResponse build = LiveMiniResponse.builder()
                    .liveId(live.getLiveId())
                    .userId(user.getUserId())
                    .nickname(user.getNickname())
                    .profileImg(user.getProfileImg())
                    .name(live.getName())
                    .session(live.getSession())
                    .point(live.getPoint())
                    .isPublic(live.getIsPublic())
                    .createdAt(live.getCreatedAt())
                    .build();
            liveMiniResponses.add(build);
        });
        boolean sorted = !pageable.getSort().isEmpty();
        boolean asc = pageable.getSort().isSorted() && pageable.getSort().getOrderFor("createdAt").isAscending();

        return new PagingResponse(
                HttpStatus.OK.value(),
                liveMiniResponses,
                lives.isFirst(),
                lives.isLast(),
                lives.getPageable().getPageNumber(),
                lives.getTotalPages(),
                lives.getSize(),
                sorted,
                asc,
                false
        );
    }

    @Transactional
    public void createLive(String session, Integer userId, String name, boolean isPublic, Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
//        Live live = liveRepository.findByUserAndIsDeletedFalse(user);
//        if (live != null) {
//            throw new DataMismatchException("해당 유저에게 아직 종료되지 않은 라이브가 존재합니다.");
//        }
        SessionProperties properties = SessionProperties.fromJson(params).build();

        Live live = Live.builder()
                .name(name)
                .user(user)
                .session(session)
                .isPublic(isPublic)
                .build();

        liveRepository.save(live);
    }

    @Transactional
    public void deleteLive(Integer userId, Integer liveId) {
        Live live = liveRepository.findByLiveId(liveId);
        if (live.getUser().getUserId() != userId) throw new UserNotMatchException("해당 유저에게 라이브 삭제 권한이 존재하지 않습니다.");
        liveRepository.deleteByLiveId(liveId);
    }

    @Transactional
    public void deleteLiveByUserId(Integer userId) {
        User user = userRepository.findByUserId(userId);
        Live live = liveRepository.findLiveByUser(user);
        if (live.getUser().getUserId() != userId) throw new UserNotMatchException("해당 유저에게 라이브 삭제 권한이 존재하지 않습니다.");

        liveRepository.delete(live);
    }

    public List<ClothesInfoResponse> getLiveUserAllCloset(Integer liveId) {
        Live live = liveRepository.findByLiveId(liveId);
        if (live == null) {
            throw new DataNotFoundException("해당 라이브가 존재하지 않습니다.");
        }
        List<Clothes> clothesList = clothesRepository.findByUserUserId(live.getUser().getUserId());
        return clothesList.stream()
                .map(clothes -> new ClothesInfoResponse(clothes, clothesDetailRepository.findByClothesId(clothes.getClothesId())))
                .collect(Collectors.toList());
    }


    public Connection enterLive(Session session, Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(connection.getToken());

        String token = builder.build().getQueryParams().getFirst("token");
        System.out.println(connection.getConnectionId());
        System.out.println(connection.getIp());

        System.out.println(token);
        return connection;
    }

    public String initSession(Integer userId, SessionProperties properties, Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        String name = null;
        boolean isPublic = true;
        if (params.get("deleted").equals(true)) {
            this.deleteLiveByUserId(userId);
            return "라이브 삭제 완료";
        }
        if (params.get("name") instanceof String) {
            name = (String) params.get("name");
        }
        if (params.get("isPublic").equals(true)) {
            isPublic = true;
        } else isPublic = false;
        Session session = openvidu.createSession(properties);

//        this.createLive(session.getSessionId(), userId, name, isPublic, params);
        return session.getSessionId();
    }

    public Session getSession(String sessionId) {
        Session session = openvidu.getActiveSession(sessionId);
        return session;
    }


}