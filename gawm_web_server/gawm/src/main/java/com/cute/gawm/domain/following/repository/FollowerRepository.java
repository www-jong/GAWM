package com.cute.gawm.domain.following.repository;

import com.cute.gawm.domain.following.entity.Follower;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowerRepository extends MongoRepository<Follower, String> {
    Follower findByUserId(int userId);

    void deleteByUserId(int userId);
}
