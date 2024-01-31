package com.cute.gawm.domain.clothes.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;


@Getter
@Data
@Builder
public class ClothesCreateRequest {
    private String userId;
    private String clothesImg;

    @JsonProperty("m_category")
    private String mCategory;

    @JsonProperty("s_category")
    private String sCategory;
    private String brand;
    private String name;
    private List<String> colors;
    private List<String> materials;
    private List<String> patterns;

}
