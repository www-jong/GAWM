package com.cute.gawm.domain.comment.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponse {
    private int commentId;
    private String content;
    private int userId;
}
