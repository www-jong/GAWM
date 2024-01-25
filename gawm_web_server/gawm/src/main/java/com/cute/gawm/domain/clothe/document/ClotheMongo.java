package com.cute.gawm.domain.clothe.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "clothe")
public class ClotheMongo {
    @Id
    @Field(value = "_id", targetType = FieldType.OBJECT_ID)
    private String id;
    private String userId; // MongoDB에서는 간단한 형태로 관리하는 것이 일반적입니다.
    private String bCategory;
    private String sCategory;
    private String brand;
    private String name;
    private String clotheImg;
    private String color;
    private String material;
    private String pattern;
    private String closetId; // 이 역시 단순화된 형태로 관리합니다.
    private Integer price;

    // 기본 생성자, getter, setter, toString() 메소드를 여기에 추가하세요
}
