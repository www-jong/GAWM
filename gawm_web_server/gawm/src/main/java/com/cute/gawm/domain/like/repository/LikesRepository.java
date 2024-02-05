package com.cute.gawm.domain.like.repository;

import com.cute.gawm.domain.like.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes,Integer> {
    void deleteByLookbookLookbookId(Integer lookbookId);
}