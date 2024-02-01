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

        // 모든 옷의 존재 여부를 먼저 확인하고, 해당 옷이 현재 사용자 소유인지 검증
        List<Clothes> clothesList = request.getClotheset().stream()
                .map(StylelogCreateRequest.ClothesStylelogCreateRequest::getClothesId)
                .map(clothesId -> clothesRepository.findById(clothesId)
                        .map(clothes -> {
                            if (!(clothes.getUser().getUserId()==(userId))) {
                                throw new RuntimeException("No permission to access clothes with id: " + clothesId);
                            }
                            return clothes;
                        })
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
        //  YYYYMM로 날짜 변환
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



    @Transactional
    public void deleteStylelog(int stylelogId,int UserId) {
        if (!stylelogRepository.existsById(stylelogId)) {
            throw new EntityNotFoundException("스타일로그를 찾을 수 없습니다. ID: " + stylelogId);
        }
        if (stylelogRepository.findByStylelogId(stylelogId).getUser().getUserId() != UserId) {
            throw new RuntimeException("권한이 없습니다.");
        }
        // 해당 스타일로그와 연관된 ClothesStylelog 정보 삭제
        clothesStylelogRepository.deleteByStylelog_StylelogId(stylelogId);

        // 스타일로그 삭제
        stylelogRepository.deleteById(stylelogId);
    }

    @Transactional
    public void updateStylelog(int stylelogId, StylelogUpdateRequest request,int UserId) {
        Stylelog stylelog = stylelogRepository.findById(stylelogId)
                .orElseThrow(() -> new RuntimeException("스타일로그를 찾을 수 없습니다."));
        if (stylelogRepository.findByStylelogId(stylelogId).getUser().getUserId() != UserId) {
            throw new RuntimeException("권한이 없습니다.");
        }
        stylelog.setLocation(request.getLocation());
        stylelog.setTemperature(request.getTemperature());
        stylelog.setWeather(request.getWeather());
        stylelog.setDate(request.getDate());

        // 기존 ClothesStylelog 엔트리들 조회
        List<ClothesStylelog> existingEntries = clothesStylelogRepository.findByStylelog_StylelogId(stylelogId);

        // 신규 데이터 처리를 위한 준비
        Map<Integer, StylelogUpdateRequest.ClothesStylelogData> newDataMap = request.getClotheset().stream()
                .collect(Collectors.toMap(StylelogUpdateRequest.ClothesStylelogData::getClothesId, Function.identity()));

        // 권한 검증 로직 추가
        for (Integer clothesId : newDataMap.keySet()) {
            Clothes clothes = clothesRepository.findById(clothesId)
                    .orElseThrow(() -> new RuntimeException("옷을 찾을 수 없습니다. Clothes ID: " + clothesId));
            if (clothes.getUser().getUserId() != UserId) {
                throw new RuntimeException("옷에 대한 권한이 없습니다. Clothes ID: " + clothesId);
            }
        }
        // 기존 데이터 중 삭제해야 할 데이터 식별 및 업데이트 로직
        existingEntries.forEach(existingEntry -> {
            StylelogUpdateRequest.ClothesStylelogData newData = newDataMap.get(existingEntry.getClothes().getClothesId());
            // 신규 데이터에 존재하지 않는 경우 삭제
            if (newData == null) {
                clothesStylelogRepository.delete(existingEntry);
            } else {
                // 신규 데이터에도 존재하지만, 위치나 크기 등이 다른 경우 업데이트
                boolean isUpdated = false;
                if (!existingEntry.getX().equals(newData.getX())) {
                    existingEntry.setX(newData.getX());
                    isUpdated = true;
                }
                if (!existingEntry.getY().equals(newData.getY())) {
                    existingEntry.setY(newData.getY());
                    isUpdated = true;
                }
                if (!existingEntry.getRotate().equals(newData.getRotate())) {
                    existingEntry.setRotate(newData.getRotate());
                    isUpdated = true;
                }
                if (!existingEntry.getSize().equals(newData.getSize())) {
                    existingEntry.setSize(newData.getSize());
                    isUpdated = true;
                }
                if (isUpdated) {
                    clothesStylelogRepository.save(existingEntry);
                }
            }
        });

        // 새로운 데이터 추가 로직
        newDataMap.entrySet().stream()
                .filter(entry -> existingEntries.stream().noneMatch(existingEntry -> existingEntry.getClothes().getClothesId()==entry.getKey()))
                .forEach(entry -> {
                    Clothes clothes = clothesRepository.findById(entry.getKey())
                            .orElseThrow(() -> new RuntimeException("옷을 찾을 수 없습니다."));
                    ClothesStylelog newClothesStylelog = new ClothesStylelog(clothes, stylelog, entry.getValue().getX(), entry.getValue().getY(), entry.getValue().getRotate(), entry.getValue().getSize());
                    clothesStylelogRepository.save(newClothesStylelog);
                });
    }
}
