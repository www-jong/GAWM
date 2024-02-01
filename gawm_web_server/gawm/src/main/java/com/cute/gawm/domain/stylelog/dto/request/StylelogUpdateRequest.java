package com.cute.gawm.domain.stylelog.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@AllArgsConstructor
public class StylelogUpdateRequest {
    private String location;
    private int temperature;
    private String weather;
    private Timestamp date;
    private List<ClothesStylelogData> clotheset;

    // Constructor, Getters, Setters
    @Getter
    @AllArgsConstructor
    public static class ClothesStylelogData {
        private int clothesId;
        private Double x;
        private Double y;
        private Double rotate;
        private Double size;

        // Constructor, Getters, Setters
    }
}
