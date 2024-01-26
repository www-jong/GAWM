package com.cute.gawm.domain.clothe.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.List;

@Getter
@Setter
@Document(collection = "clothe")
public class ClotheDetail {
    @Id
    @Field(value = "_id", targetType = FieldType.OBJECT_ID)
    private String id;
    private String userId; // MongoDB에서는 간단한 형태로 관리하는 것이 일반적입니다.
    @Field(value = "m_category")
    private String mCategory;
    @Field(value = "s_category")
    private String sCategory;
    private String brand;
    private String name;
    private String clotheImg;
    private List<String> colors;
    private List<String> materials;
    private List<String> patterns;
    private String closetId; // 이 역시 단순화된 형태로 관리합니다.
    private Integer price;

    // 기본 생성자, getter, setter, toString() 메소드를 여기에 추가하세요
}
