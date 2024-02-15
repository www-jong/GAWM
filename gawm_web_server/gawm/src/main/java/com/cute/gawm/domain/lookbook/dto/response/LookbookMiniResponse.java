package com.cute.gawm.domain.lookbook.dto.response;

import com.cute.gawm.domain.lookbook_image.entity.LookbookImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LookbookMiniResponse {
    private int userId;
    private Timestamp createdAt;
    private List<LookbookImage> images;
    private Integer view;
    private Boolean isPublic;
}
