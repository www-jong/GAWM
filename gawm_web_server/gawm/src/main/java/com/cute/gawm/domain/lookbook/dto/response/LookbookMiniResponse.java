package com.cute.gawm.domain.lookbook.dto.response;

import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.comment.entity.Comment;
import com.cute.gawm.domain.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.sql.Timestamp;
import java.util.List;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LookbookMiniResponse {
    private int userId;
    private Timestamp createdAt;
    private List<String> images;
    private Integer view;
}
