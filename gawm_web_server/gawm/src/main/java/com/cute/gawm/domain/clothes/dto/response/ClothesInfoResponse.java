package com.cute.gawm.domain.clothes.dto.response;

import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.entity.ClothesDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;
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

    // BaseEntity의 필드 추가
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Boolean isDeleted;

    public ClothesInfoResponse(Clothes clothes, ClothesDetail clothesDetail) {
        this.clothesId = clothes.getClothesId();
        this.userId = clothes.getUser().getUserId();
        this.orderNum = clothes.getOrderNum();
        this.clothesImg = clothes.getClothesImg();
        this.mCategory = clothes.getMCategory();
        this.sCategory = clothesDetail.getSCategory();
        this.brand = clothes.getBrand();
        this.name = clothes.getName();
        this.colors = clothesDetail.getColors();
        this.materials = clothesDetail.getMaterials();
        this.patterns = clothesDetail.getPatterns();
        this.createdAt = clothes.getCreatedAt();
        this.updatedAt = clothes.getUpdatedAt();
        this.isDeleted = clothes.getIsDeleted();
    }

}
