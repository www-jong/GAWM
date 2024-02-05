package com.cute.gawm.domain.comment.repository;

import com.cute.gawm.domain.comment.entity.Comment;

import java.util.List;

public interface CommentRepositoryCustom {
    List<Comment> getAllByLookbookId(Integer lookbookId);
}
