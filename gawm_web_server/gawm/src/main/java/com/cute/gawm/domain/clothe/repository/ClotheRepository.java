package com.cute.gawm.domain.clothe.repository;

import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.clothe.entity.ClotheDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClotheRepository extends JpaRepository<Clothe,Integer> {

    @Query("SELECT COALESCE(MAX(c.orderNum), 0) FROM Clothe c WHERE c.user.userId = :userId")
    int findLastOrderValueByUserId(Integer userId);

    List<Clothe> findByUserUserId(int userId);
}
