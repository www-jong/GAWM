package com.cute.gawm.domain.clothes.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
@Data
@Builder
public class ClothesUpdateResponse {
    private String mCategory;
    private String sCategory;
    private String brand;
    private String name;
    private List<String> colors;
    private List<String> materials;
    private List<String> patterns;
}
