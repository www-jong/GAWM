package com.cute.gawm.domain.live.service;

import com.cute.gawm.common.exception.UserNotFoundException;
import com.cute.gawm.domain.following.entity.Following;
import com.cute.gawm.domain.following.repository.FollowingRepository;
import com.cute.gawm.domain.live.dto.request.LiveCreateRequest;
import com.cute.gawm.domain.live.entity.Live;
import com.cute.gawm.domain.live.repository.LiveRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LiveService {
    private final LiveRepository liveRepository;
    private final FollowingRepository followingRepository;
    private final UserRepository userRepository;

    public PageImpl<Live> getFollowingLive(Integer userId, Pageable pageable){
        Following followings = followingRepository.findByUserId(userId);
        List<Live> liveList = new ArrayList<>();
        followings.getFollowingList().forEach(followingId -> {
            User user = userRepository.findById(followingId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
            Live live = liveRepository.findByUser(user);
            liveList.add(live);
        });

        return new PageImpl<>(liveList, pageable, liveList.size());
    }

    public void createLive(Integer userId, LiveCreateRequest liveCreateRequest){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
        Live live = Live.builder()
                .name(liveCreateRequest.getName())
                .user(user)
                .build();
        liveRepository.save(live);
    }
}
