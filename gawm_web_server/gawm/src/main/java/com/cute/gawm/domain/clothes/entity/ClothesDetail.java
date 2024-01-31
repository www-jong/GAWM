package com.cute.gawm.domain.clothes.entity;

import com.cute.gawm.domain.clothes.dto.request.ClothesUpdateResponse;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "clothesdetail")
public class ClothesDetail {

    @Id
    @Field(value = "clothesdetail_id", targetType = FieldType.OBJECT_ID)
    private String clothesDetailId;

    @Indexed
    @Field(value = "clothes_id")
    private int clothesId;

    //private String userId;

    @Field(value = "m_category")
    private String mCategory;

    @Field(value = "s_category")
    private String sCategory;

    private String brand;

    private String name;

    private List<String> colors;

    private List<String> materials;

    private List<String> patterns;

    public void updateDetails(ClothesUpdateResponse clothesUpdateResponse) {
        this.mCategory = clothesUpdateResponse.getMCategory();
        this.sCategory = clothesUpdateResponse.getSCategory();
        this.brand = clothesUpdateResponse.getBrand();
        this.name = clothesUpdateResponse.getName();
        this.colors = clothesUpdateResponse.getColors();
        this.materials = clothesUpdateResponse.getMaterials();
        this.patterns = clothesUpdateResponse.getPatterns();
    }
}
