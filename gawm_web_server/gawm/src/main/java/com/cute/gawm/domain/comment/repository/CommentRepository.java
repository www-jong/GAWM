package com.cute.gawm.domain.comment.repository;

import com.cute.gawm.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Integer> {

    void deleteByLookbookLookbookId(Integer lookbookId);
}
