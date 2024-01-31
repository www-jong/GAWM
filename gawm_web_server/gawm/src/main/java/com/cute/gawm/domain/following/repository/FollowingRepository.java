package com.cute.gawm.domain.following.repository;

import com.cute.gawm.domain.following.entity.Following;
import com.mongodb.lang.Nullable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowingRepository extends MongoRepository<Following, String> {
    @Nullable
    Following findByUserId(int userId);
}
