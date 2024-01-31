package com.cute.gawm.domain.following.repository;

import com.cute.gawm.domain.following.entity.Follower;
import com.mongodb.lang.Nullable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowerRepository extends MongoRepository<Follower, String> {
    @Nullable
    Follower findByUserId(int userId);
}
