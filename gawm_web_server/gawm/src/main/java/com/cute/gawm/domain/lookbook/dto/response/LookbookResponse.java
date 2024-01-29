package com.cute.gawm.domain.lookbook.dto.response;

import com.cute.gawm.domain.clothe.dto.response.ClotheMiniResponse;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.comment.dto.response.CommentResponse;
import com.cute.gawm.domain.comment.entity.Comment;
import com.cute.gawm.domain.tag.dto.resquest.TagResponse;
import com.cute.gawm.domain.tag.entity.Tag;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Builder
public class LookbookResponse {
    private int lookbookId;
    private int userId;
    private Timestamp createdAt;
    private ClotheMiniResponse clothe;
    private int view;
    private TagResponse tag;
    private CommentResponse comment;
}
