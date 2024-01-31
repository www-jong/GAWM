package com.cute.gawm.domain.stylelog.entity;

import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import javax.persistence.Id;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "stylelogdetail")
public class StylelogDetail {

    @Id
    @Field(value = "stylelogdetail_id", targetType = FieldType.OBJECT_ID)
    private String id;

    @Field("stylelog_id")
    @Indexed
    private String stylelogId;

    private String location;
    private int temperature;
    private String weather;

    @Field("clothess")
    private List<clothes> clothes;


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class clothes {
        @Field("clothes_id")
        private int clothesId;
        private Double x;
        private Double y;
        private Double rotate = 0.0;
        private Double size;


        // getters, setters, constructor
    }

}