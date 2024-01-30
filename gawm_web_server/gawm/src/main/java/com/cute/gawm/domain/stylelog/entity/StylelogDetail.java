package com.cute.gawm.domain.stylelog.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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
    private String id;

    @Field("stylelog_id")
    private String stylelogId;

    private String location;
    private String temperature;
    private String weather;

    @Field("clothes")
    private List<Clothe> clothes;


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Clothe {
        @Field("clothe_id")
        private String clotheId;
        private Double x;
        private Double y;
        private Double rotate = 0.0;
        private Double size;

        // getters, setters, constructor
    }

}