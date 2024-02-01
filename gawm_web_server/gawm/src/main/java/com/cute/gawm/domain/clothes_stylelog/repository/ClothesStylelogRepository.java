package com.cute.gawm.domain.clothes_stylelog.repository;

import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes_stylelog.entity.ClothesStylelog;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface ClothesStylelogRepository  extends JpaRepository<ClothesStylelog, Integer> {

    List<ClothesStylelog> findByStylelog_StylelogId(int stylelogId);
    void deleteByStylelog_StylelogId(int stylelogId);

}