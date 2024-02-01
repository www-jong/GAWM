package com.cute.gawm.domain.stylelog.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@AllArgsConstructor
public class StylelogCreateRequest {
    private String location;
    private int temperature;
    private String weather;
    private Timestamp date; // Timestamp 포맷의 문자열로 받을 예정
    private List<ClothesStylelogCreateRequest> clotheset;

    @Getter
    @AllArgsConstructor
    public static class ClothesStylelogCreateRequest {
        private int clothesId;
        private double x;
        private double y;
        private double rotate;
        private double size;
    }
}
