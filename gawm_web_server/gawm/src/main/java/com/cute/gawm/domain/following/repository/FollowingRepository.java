package com.cute.gawm.domain.following.repository;

import com.cute.gawm.domain.following.entity.Following;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowingRepository extends MongoRepository<Following, String> {
    Following findByUserId(int userId);

    void deleteByUserId(int userId);
}
