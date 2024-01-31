package com.cute.gawm.domain.lookbook.dto.response;

import com.cute.gawm.domain.clothes.dto.response.ClothesMiniResponse;
import com.cute.gawm.domain.comment.dto.response.CommentResponse;
import com.cute.gawm.domain.tag.dto.resquest.TagResponse;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class LookbookResponse {
    private int lookbookId;
    private int userId;
    private Timestamp createdAt;
    private ClothesMiniResponse clothes;
    private int view;
    private TagResponse tag;
    private CommentResponse comment;
}
