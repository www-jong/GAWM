package com.cute.gawm.domain.lookbook.dto.response;

import com.cute.gawm.domain.lookbook_image.entity.LookbookImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LookbookThumbnailResponse {
    private int lookbookId;
    private String userNickname;
    private String userProfileImg;
    private Timestamp createdAt;
    private List<String> images;
    private Integer likeCnt;
    private Boolean isPublic;
}
