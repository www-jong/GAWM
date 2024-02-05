package com.cute.gawm.domain.clothes.repository;

import com.cute.gawm.domain.clothes.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes,Integer> {

    @Query("SELECT COALESCE(MAX(c.orderNum), 0) FROM Clothes c WHERE c.user.userId = :userId")
    int findLastOrderValueByUserId(int userId);

    @Query("SELECT c FROM Clothes c WHERE " +
            "(:name IS NULL OR c.name = :name) AND " +
            "(:mCategory IS NULL OR c.mCategory = :mCategory) AND " +
            "(:userId IS NULL OR c.user.userId = :userId) AND " +
            "(:brand IS NULL OR c.brand = :brand)")
    List<Clothes> findByCriteria(@Param("name") String name,
                                 @Param("mCategory") String mCategory,
                                 @Param("userId") Integer userId,
                                 @Param("brand") String brand);
    List<Clothes> findByUserUserId(int userId);

    void deleteByUserUserId(Integer userId);
}
