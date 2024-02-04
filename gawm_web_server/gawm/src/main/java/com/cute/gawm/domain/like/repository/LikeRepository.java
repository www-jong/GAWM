package com.cute.gawm.domain.like.repository;

import com.cute.gawm.domain.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like,Integer> {
    void deleteByLookbookLookbookId(Integer lookbookId);
}