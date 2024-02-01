package com.cute.gawm.domain.stylelog.service;

import com.cute.gawm.domain.clothes.dto.response.ClothesInfoResponse;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.repository.ClothesRepository;
import com.cute.gawm.domain.clothes.service.ClothesService;
import com.cute.gawm.domain.clothes_stylelog.entity.ClothesStylelog;
import com.cute.gawm.domain.clothes_stylelog.repository.ClothesStylelogRepository;
import com.cute.gawm.domain.stylelog.dto.request.StylelogUpdateRequest;
import com.cute.gawm.domain.stylelog.dto.request.StylelogCreateRequest;

import com.cute.gawm.domain.stylelog.dto.response.StylelogDetailResponse;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import com.cute.gawm.domain.stylelog.repository.StylelogRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class StylelogService {

    @Autowired
    private StylelogRepository stylelogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClothesRepository clothesRepository;

    @Autowired
    private ClothesStylelogRepository clothesStylelogRepository;

    @Autowired
    private ClothesService clothesService;

    @Transactional
    public void createStylelog(StylelogCreateRequest request, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 모든 옷의 존재 여부를 먼저 확인
        List<Clothes> clothesList = request.getClotheset().stream()
                .map(StylelogCreateRequest.ClothesStylelogCreateRequest::getClothesId)
                .map(clothesId -> clothesRepository.findById(clothesId)
                        .orElseThrow(() -> new RuntimeException("Clothes not found with id: " + clothesId)))
                .collect(Collectors.toList());

        // Stylelog 엔티티 생성 및 저장
        Stylelog stylelog = Stylelog.builder()
                .user(user)
                .location(request.getLocation())
                .temperature(request.getTemperature())
                .weather(request.getWeather())
                .date(request.getDate())
                .build();
        stylelogRepository.save(stylelog);

        // ClothesStylelog 엔티티 생성 및 저장
        request.getClotheset().forEach(clothesStylelogRequest -> {
            Clothes clothes = clothesList.stream()
                    .filter(c -> c.getClothesId() == clothesStylelogRequest.getClothesId())
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("Clothes not found. This should not happen."));

            ClothesStylelog clothesStylelog = ClothesStylelog.builder()
                    .clothes(clothes)
                    .stylelog(stylelog)
                    .x(clothesStylelogRequest.getX())
                    .y(clothesStylelogRequest.getY())
                    .rotate(clothesStylelogRequest.getRotate())
                    .size(clothesStylelogRequest.getSize())
                    .build();
            clothesStylelogRepository.save(clothesStylelog);
        });
    }


    @Transactional(readOnly = true)
    public Map<String, List<StylelogDetailResponse>> getStylelogsByYearGroupedByMonth(int year, Integer userId) {
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate endOfYear = LocalDate.of(year, 12, 31);

        // 해당 년도의 모든 스타일로그 조회
        List<Stylelog> stylelogsOfYear = stylelogRepository.findAllByUserUserIdAndDateBetween(
                userId,
                Timestamp.valueOf(startOfYear.atStartOfDay()),
                Timestamp.valueOf(endOfYear.atTime(LocalTime.MAX))
        );

        // 월별로 그룹화 및 상세 정보 조회
        Map<String, List<StylelogDetailResponse>> groupedByMonth = new TreeMap<>(); // TreeMap을 사용하여 키(월) 기준으로 정렬

        // 모든 월에 대해 빈 리스트 초기화 (년도의 모든 월에 대해 키를 생성)
        IntStream.rangeClosed(1, 12).forEach(month ->
                groupedByMonth.put(String.format("%04d%02d", year, month), new ArrayList<>())
        );

        // 스타일로그 데이터 채우기
        for (Stylelog stylelog : stylelogsOfYear) {
            String monthKey = DateTimeFormatter.ofPattern("yyyyMM").format(stylelog.getDate().toLocalDateTime());
            StylelogDetailResponse detailResponse = getStylelogDetail(stylelog.getStylelogId());
            groupedByMonth.get(monthKey).add(detailResponse);
        }

        return groupedByMonth;
    }

    @Transactional(readOnly = true)
    public List<StylelogDetailResponse> getStylelogsByYearAndMonth(int year, int month, Integer userId) {
        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);

        Timestamp startTimestamp = Timestamp.valueOf(startOfMonth.atStartOfDay());
        Timestamp endTimestamp = Timestamp.valueOf(endOfMonth.atStartOfDay());

        List<Stylelog> stylelogs = stylelogRepository.findAllByUserUserIdAndDateBetween(userId, startTimestamp, endTimestamp);

        return stylelogs.stream()
                .map(stylelog -> getStylelogDetail(stylelog.getStylelogId()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public StylelogDetailResponse getStylelogDetail(int stylelogId) {
        // Stylelog 엔티티 조회
        Stylelog stylelog = stylelogRepository.findById(stylelogId)
                .orElseThrow(() -> new RuntimeException("스타일로그를 찾을 수 없습니다."));

        // 해당 Stylelog와 연관된 모든 ClothesStylelog 엔티티 조회
        List<ClothesStylelog> clothesStylelogs = clothesStylelogRepository.findByStylelog_StylelogId(stylelogId);

        // 각 ClothesStylelog에 대해 ClothesInfoResponse를 생성하고 CustomClothesResponse에 포함시킴
        List<StylelogDetailResponse.CustomClothesResponse> customClothesResponses = clothesStylelogs.stream()
                .map(clothesStylelog -> {
                    // 옷의 상세 정보 조회
                    ClothesInfoResponse clothesInfoResponse = clothesService.getClothesInfo(clothesStylelog.getClothes().getClothesId());
                    // CustomClothesResponse 객체 생성
                    return new StylelogDetailResponse.CustomClothesResponse(
                            clothesInfoResponse,
                            clothesStylelog.getX(),
                            clothesStylelog.getY(),
                            clothesStylelog.getRotate(),
                            clothesStylelog.getSize()
                    );
                })
                .collect(Collectors.toList());

        // 최종 StylelogDetailResponse 객체 생성 및 반환
        return new StylelogDetailResponse(stylelog,customClothesResponses);
    }

    // Constructor injection is recommended
    public StylelogService(StylelogRepository stylelogRepository) {
        this.stylelogRepository = stylelogRepository;
    }

    @Transactional
    public void deleteStylelog(int stylelogId) {
        if (!stylelogRepository.existsById(stylelogId)) {
            throw new EntityNotFoundException("스타일로그를 찾을 수 없습니다. ID: " + stylelogId);
        }

        // 해당 스타일로그와 연관된 ClothesStylelog 정보 삭제
        clothesStylelogRepository.deleteByStylelog_StylelogId(stylelogId);

        // 스타일로그 삭제
        stylelogRepository.deleteById(stylelogId);
    }

    @Transactional
    public void updateStylelog(int stylelogId, StylelogUpdateRequest request) {
        Stylelog stylelog = stylelogRepository.findById(stylelogId)
                .orElseThrow(() -> new RuntimeException("스타일로그를 찾을 수 없습니다."));

        stylelog.setLocation(request.getLocation());
        stylelog.setTemperature(request.getTemperature());
        stylelog.setWeather(request.getWeather());
        stylelog.setDate(request.getDate());

        // 기존 ClothesStylelog 엔트리들 조회
        List<ClothesStylelog> existingEntries = clothesStylelogRepository.findByStylelog_StylelogId(stylelogId);

        // 요청된 ClothesStylelog 데이터를 Map으로 변환 (key: clothesId, value: ClothesStylelogData)
        Map<Integer, StylelogUpdateRequest.ClothesStylelogData> requestMap = request.getClotheset().stream()
                .collect(Collectors.toMap(StylelogUpdateRequest.ClothesStylelogData::getClothesId, Function.identity()));

        // 기존 데이터 처리
        Set<Integer> toRemove = existingEntries.stream()
                .filter(e -> !requestMap.containsKey(e.getClothes().getClothesId()))
                .peek(e -> clothesStylelogRepository.delete(e))
                .map(e -> e.getClothes().getClothesId())
                .collect(Collectors.toSet());

        // 새로운 데이터 추가
        request.getClotheset().stream()
                .filter(e -> !toRemove.contains(e.getClothesId()))
                .forEach(data -> {
                    Clothes clothes = clothesRepository.findById(data.getClothesId())
                            .orElseThrow(() -> new RuntimeException("옷을 찾을 수 없습니다."));

                    if (!existingEntries.stream().anyMatch(e -> e.getClothes().getClothesId() == data.getClothesId())) {
                        ClothesStylelog newEntry = new ClothesStylelog(clothes, stylelog, data.getX(), data.getY(), data.getRotate(), data.getSize());
                        clothesStylelogRepository.save(newEntry);
                    }
                });
    }

}
