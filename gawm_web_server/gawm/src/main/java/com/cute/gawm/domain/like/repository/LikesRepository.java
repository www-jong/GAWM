package com.cute.gawm.domain.like.repository;

import com.cute.gawm.domain.like.entity.Likes;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes,Integer> {
    void deleteByLookbookLookbookId(Integer lookbookId);
    void deleteByLookbookAndUser(Lookbook lookbook, User user);

    void deleteByUserUserId(Integer userId);
    Integer countByLookbook(Lookbook lookbook);
    boolean existsByLookbookAndUserUserId(Lookbook lookbook, Integer userId);
}