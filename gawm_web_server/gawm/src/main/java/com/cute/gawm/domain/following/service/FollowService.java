package com.cute.gawm.domain.following.service;

import com.cute.gawm.common.exception.DataMismatchException;
import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.domain.following.entity.Follower;
import com.cute.gawm.domain.following.entity.Following;
import com.cute.gawm.domain.following.repository.FollowerRepository;
import com.cute.gawm.domain.following.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowingRepository followingRepository;
    private final FollowerRepository followerRepository;

    public void saveFollow(Integer userId, int followId) {
        if(userId==followId){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"자신을 팔로우할 수 없습니다.");
        }
        Following userFollowing = getOrCreateFollowing(userId);
        Follower followFollower = getOrCreateFollower(followId);

        List<Integer> followingList = userFollowing.getFollowingList();
        List<Integer> followerList = followFollower.getFollowerList();

        if (followingList.contains(followId)) {
            unfollow(userId, followId, followerList, followingList, userFollowing, followFollower);
        } else {
            follow(userId, followId, followingList, userFollowing, followerList, followFollower);
        }
    }

    private Following getOrCreateFollowing(Integer userId) {
        Following userFollowing = followingRepository.findByUserId(userId);
        return userFollowing != null ? userFollowing : new Following(userId, new ArrayList<>());
    }

    private Follower getOrCreateFollower(int followId) {
        Follower followFollower = followerRepository.findByUserId(followId);
        return followFollower != null ? followFollower : new Follower(followId, new ArrayList<>());
    }

    private void follow(Integer userId, int followId, List<Integer> followingList, Following userFollowing,
                        List<Integer> followerList, Follower followFollower) {
        if(followerList.contains(userId)){
            throw new DataMismatchException("해당 팔로우 관계가 존재하지 않습니다.");
        }
        followingList.add(followId);
        userFollowing.update(followingList);

        followerList.add(userId);
        followFollower.update(followerList);

        saveFollowingAndFollower(userFollowing, followFollower);
    }

    private void unfollow(Integer userId, int followId, List<Integer> followerList, List<Integer> followingList,
                          Following userFollowing, Follower followFollower) {
        if (!followerList.remove(Integer.valueOf(userId))) {
            throw new DataMismatchException("해당 팔로우 관계가 존재하지 않습니다.");
        }

        followingList.remove(Integer.valueOf(followId));

        userFollowing.update(followingList);
        saveFollowing(userFollowing);

        followFollower.update(followerList);
        saveFollower(followFollower);
    }

    private void saveFollowingAndFollower(Following userFollowing, Follower followFollower) {
        saveFollowing(userFollowing);
        saveFollower(followFollower);
    }

    public void saveFollowing(Following userFollowing) {
        followingRepository.save(userFollowing);
    }

    public void saveFollower(Follower followFollower) {
        followerRepository.save(followFollower);
    }
}
