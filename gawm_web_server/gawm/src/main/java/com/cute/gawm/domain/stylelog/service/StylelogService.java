package com.cute.gawm.domain.stylelog.service;

import com.cute.gawm.domain.stylelog.entity.Stylelog;
import com.cute.gawm.domain.stylelog.repository.StylelogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Service
public class StylelogService {

    @Autowired
    private StylelogRepository stylelogRepository;


    public List<Stylelog> getStylelogsByMonth(int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1).minusMonths(1);
        LocalDate endDate = LocalDate.of(year, month, 1).plusMonths(2).minusDays(1);

        Timestamp startTimestamp = Timestamp.valueOf(startDate.atStartOfDay());
        Timestamp endTimestamp = Timestamp.valueOf(endDate.atStartOfDay());

        return stylelogRepository.findByCreatedAtBetween(startTimestamp, endTimestamp);
    }
}
