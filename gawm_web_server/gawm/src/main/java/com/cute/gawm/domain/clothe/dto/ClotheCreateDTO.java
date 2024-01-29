package com.cute.gawm.domain.clothe.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Data
@Builder
public class ClotheCreateDTO {
    private String userId;
    private String clotheImg;

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
