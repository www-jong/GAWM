package com.cute.gawm.domain.clothes.entity;

import com.cute.gawm.domain.clothes.dto.request.ClothesUpdateRequest;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import javax.persistence.Column;
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

    private String brand;

    private List<String> colors;

    @Field(value = "s_category")
    private String sCategory;
    private List<String> materials;

    private List<String> patterns;

    public void updateDetails(ClothesUpdateRequest clothesUpdateRequest) {
        this.brand = clothesUpdateRequest.getBrand();
        this.colors = clothesUpdateRequest.getColors();
        this.materials = clothesUpdateRequest.getMaterials();
        this.patterns = clothesUpdateRequest.getPatterns();
    }
}
