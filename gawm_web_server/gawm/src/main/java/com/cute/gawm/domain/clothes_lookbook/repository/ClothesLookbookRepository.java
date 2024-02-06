package com.cute.gawm.domain.clothes_lookbook.repository;

import com.cute.gawm.domain.clothes_lookbook.entity.ClothesLookbook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesLookbookRepository extends JpaRepository<ClothesLookbook, Integer>, ClothesLookbookRepositoryCustom {
    void deleteAllByLookbook(Integer lookbookId);
}
