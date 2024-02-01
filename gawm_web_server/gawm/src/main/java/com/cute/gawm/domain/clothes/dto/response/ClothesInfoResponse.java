package com.cute.gawm.domain.clothes.dto.response;

import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.entity.ClothesDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ClothesInfoResponse {
    private int clothesId;
    private int userId;
    private int orderNum;
    private String clothesImg;
    private String mCategory;
    private String sCategory;
    private String brand;
    private String name;
    private List<String> colors;
    private List<String> materials;
    private List<String> patterns;

    public ClothesInfoResponse(Clothes clothes, ClothesDetail clothesDetail) {
        this.clothesId = clothes.getClothesId();
        this.userId = clothes.getUser().getUserId();
        this.orderNum = clothes.getOrderNum();
        this.clothesImg = clothes.getClothesImg();
        this.mCategory = clothes.getMCategory();
        this.sCategory = clothesDetail.getSCategory();
        this.brand = clothesDetail.getBrand();
        this.name = clothes.getName();
        this.colors = clothesDetail.getColors();
        this.materials = clothesDetail.getMaterials();
        this.patterns = clothesDetail.getPatterns();
    }

}
