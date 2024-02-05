package com.cute.gawm.domain.comment.repository;

import com.cute.gawm.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> getCommentsByLookbook(int lookbookId);
}
