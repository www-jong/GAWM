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

    @Field("clothess")
    private List<clothes> clothess;


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class clothes {
        @Field("clothes_id")
        private String clothesId;
        private Double x;
        private Double y;
        private Double rotate = 0.0;
        private Double size;

        // getters, setters, constructor
    }

}