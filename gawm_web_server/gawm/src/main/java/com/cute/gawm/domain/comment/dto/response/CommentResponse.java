package com.cute.gawm.domain.comment.dto.response;

import com.cute.gawm.domain.comment.entity.Comment;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponse {
    private int commentId;
    private String content;
    private String userNickname;
    private String userProfileImg;
    private boolean isCommentAuthor;
}
