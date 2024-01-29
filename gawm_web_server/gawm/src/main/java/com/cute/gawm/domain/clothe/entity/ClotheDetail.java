package com.cute.gawm.domain.clothe.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.List;
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "clothe")
public class ClotheDetail {
    @Id
    @Field(value = "clothe_detail_id", targetType = FieldType.OBJECT_ID)
    private int clotheDetailId;

    @Indexed
    @Field(value = "clothe_id")
    private int clotheId;

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

}
