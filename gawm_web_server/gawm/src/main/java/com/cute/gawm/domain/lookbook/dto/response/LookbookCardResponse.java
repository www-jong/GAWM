package com.cute.gawm.domain.lookbook.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LookbookCardResponse {
    private int lookbookId;
    private String image;
}
