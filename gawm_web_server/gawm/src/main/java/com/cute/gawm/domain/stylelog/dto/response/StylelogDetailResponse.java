package com.cute.gawm.domain.stylelog.dto.response;

import com.cute.gawm.domain.clothes.dto.response.ClothesInfoResponse;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
public class StylelogDetailResponse {
    private int stylelogId;
    private String location;
    private String weather;
    private int temperature;
    private Timestamp date;
    private List<CustomClothesResponse> clothesDetails;

    // 추가된 생성자
    public StylelogDetailResponse(int stylelogId, String location, String weather, int temperature, Timestamp date, List<CustomClothesResponse> clothesDetails) {
        this.stylelogId = stylelogId;
        this.location = location;
        this.weather = weather;
        this.temperature = temperature;
        this.date = date;
        this.clothesDetails = clothesDetails;
    }
    public StylelogDetailResponse(Stylelog stylelog, List<CustomClothesResponse> clothesDetails) {
        this.stylelogId = stylelog.getStylelogId();
        this.location = stylelog.getLocation();
        this.weather = stylelog.getWeather();
        this.temperature = stylelog.getTemperature();
        this.date = stylelog.getDate();
        this.clothesDetails = clothesDetails;
    }
    // CustomClothesResponse 내부 클래스
    @Getter
    @Setter
    public static class CustomClothesResponse {
        private ClothesInfoResponse clothesInfoResponse;
        private Double x;
        private Double y;
        private Double rotate;
        private Double size;

        public CustomClothesResponse(ClothesInfoResponse clothesInfoResponse, Double x, Double y, Double rotate, Double size) {
            this.clothesInfoResponse = clothesInfoResponse;
            this.x = x;
            this.y = y;
            this.rotate = rotate;
            this.size = size;
        }

    }

    // Getters and Setters for StylelogDetailResponse
    // ...
}