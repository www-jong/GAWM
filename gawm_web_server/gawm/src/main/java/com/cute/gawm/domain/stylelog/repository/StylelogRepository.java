package com.cute.gawm.domain.stylelog.repository;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface StylelogRepository extends JpaRepository<Stylelog, Integer> {

    List<Stylelog> findAllByUserUserIdAndDateBetween(Integer userId, Timestamp startDate, Timestamp endDate);

}