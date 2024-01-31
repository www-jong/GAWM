package com.cute.gawm.domain.stylelog.dto.request;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class StylelogCreateRequest {

    private Timestamp date;


    private String location;
    private int temperature;
    private String weather;
    private List<ClothesData> clothes;
    @Data
    public static class ClothesData {
        private int clothesId;
        private Double x;
        private Double y;
        private Double rotate;
        private Double size;
    }
}