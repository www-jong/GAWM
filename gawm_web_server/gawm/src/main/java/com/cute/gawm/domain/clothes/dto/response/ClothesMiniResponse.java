package com.cute.gawm.domain.clothes.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ClothesMiniResponse {
    private int clothesId;
    private String name;
    private String brand;
    private String clothesImg;
}

