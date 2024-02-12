package com.cute.gawm.domain.stylelog.repository;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface StylelogRepository extends JpaRepository<Stylelog, Integer> {

    List<Stylelog> findAllByUserUserIdAndDateBetween(Integer userId, Timestamp startDate, Timestamp endDate);
    Stylelog findByStylelogId(Integer StylelogId);
    List<Stylelog> findByUserUserId(Integer userId);
    void deleteByUserUserId(Integer userId);

}