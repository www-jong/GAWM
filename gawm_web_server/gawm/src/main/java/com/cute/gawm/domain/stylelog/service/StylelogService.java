package com.cute.gawm.domain.stylelog.service;

import com.cute.gawm.domain.stylelog.dto.response.StylelogCreateRequest;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import com.cute.gawm.domain.stylelog.entity.StylelogDetail;
import com.cute.gawm.domain.stylelog.repository.StylelogDetailRepository;
import com.cute.gawm.domain.stylelog.repository.StylelogRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StylelogService {

    @Autowired
    private StylelogRepository stylelogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StylelogDetailRepository stylelogDetailRepository;

    public List<Stylelog> getStylelogsByMonth(int year, int month, Integer userId) {
        LocalDate startDate = LocalDate.of(year, month, 1).minusMonths(1);
        LocalDate endDate = LocalDate.of(year, month, 1).plusMonths(2).minusDays(1);

        Timestamp startTimestamp = Timestamp.valueOf(startDate.atStartOfDay());
        Timestamp endTimestamp = Timestamp.valueOf(endDate.atStartOfDay());

        return stylelogRepository.findByUserUserIdAndCreatedAtBetween(userId, startTimestamp, endTimestamp);
    }

    public void createStylelog(StylelogCreateRequest request, Integer userId) {
        // 유저 찾기
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Stylelog 엔티티 생성
        Stylelog stylelog = Stylelog.builder()
                .user(user)
                .date(request.getDate()) // 이 date는 stylelog의 날짜임(ex, 3월4일 입은 날짜)
                .build();
        stylelogRepository.save(stylelog);

        StylelogDetail stylelogDetail = StylelogDetail.builder()
                .stylelogId(String.valueOf(stylelog.getStylelogId()))
                .location(request.getLocation())
                .temperature(request.getTemperature())
                .weather(request.getWeather())
                .clothess(request.getClothes().stream()
                        .map(c -> new StylelogDetail.clothes(
                                c.getClothesId(), c.getX(), c.getY(), c.getRotate(), c.getSize()))
                        .collect(Collectors.toList()))
                .build();
        stylelogDetailRepository.save(stylelogDetail);
    }
}
