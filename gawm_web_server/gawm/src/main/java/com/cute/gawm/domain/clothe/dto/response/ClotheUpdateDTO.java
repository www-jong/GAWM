package com.cute.gawm.domain.clothe.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
@Data
@Builder
public class ClotheUpdateDTO {
    private String clotheImg;
    private String mCategory;
    private String sCategory;
    private String brand;
    private String name;
    private List<String> colors;
    private List<String> materials;
    private List<String> patterns;
}
