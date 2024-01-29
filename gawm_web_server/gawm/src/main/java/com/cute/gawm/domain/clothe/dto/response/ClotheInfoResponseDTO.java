package com.cute.gawm.domain.clothe.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class ClotheInfoResponseDTO {
    private int id;
    private String userId;
    private String clotheImg;
    private String mCategory;
    private String sCategory;
    private String brand;
    private String name;
    private List<String> Colors;
    private List<String> materials;
    private List<String> patterns;

}
