package com.cute.gawm.domain.clothe.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClotheMiniResponse {
    private int clotheId;
    private String name;
    private String brand;
    private String clotheImg;
}

