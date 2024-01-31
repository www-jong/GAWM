package com.cute.gawm.domain.clothes.repository;

import com.cute.gawm.domain.clothes.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes,Integer> {

    @Query("SELECT COALESCE(MAX(c.orderNum), 0) FROM Clothes c WHERE c.user.userId = :userId")
    int findLastOrderValueByUserId(Integer userId);

    List<Clothes> findByUserUserId(int userId);
}
