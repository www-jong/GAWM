package com.cute.gawm.domain.following.service;

import com.cute.gawm.domain.following.entity.Follower;
import com.cute.gawm.domain.following.entity.Following;
import com.cute.gawm.domain.following.repository.FollowerRepository;
import com.cute.gawm.domain.following.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowingRepository followingRepository;
    private final FollowerRepository followerRepository;

    public void saveFollow(Integer userId, int followId) {
        //조회 or 생성
        Following user_following = followingRepository.findByUserId(userId);
        if (user_following == null) {
            user_following = new Following(userId, new ArrayList<>());
        }

        Follower follow_follower = followerRepository.findByUserId(followId);
        if (follow_follower == null) {
            follow_follower = new Follower(followId, new ArrayList<>());
        }

        //추가
        ArrayList<Integer> followingList = user_following.getFollowingList();
        if (followingList == null) {
            followingList = new ArrayList<>();
        }
        followingList.add(followId);
        user_following.update(followingList);

        ArrayList<Integer> followerList = follow_follower.getFollowerList();
        if (followerList == null) {
            followerList = new ArrayList<>();
        }
        followerList.add(userId);
        follow_follower.update(followerList);

        //갱신
        followingRepository.save(user_following);
        followerRepository.save(follow_follower);
    }
}
