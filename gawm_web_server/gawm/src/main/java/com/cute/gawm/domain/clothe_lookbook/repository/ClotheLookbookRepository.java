package com.cute.gawm.domain.clothe_lookbook.repository;

import com.cute.gawm.domain.clothe_lookbook.entity.ClotheLookbook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClotheLookbookRepository extends JpaRepository<ClotheLookbook, Integer>, ClotheLookbookRepositoryCustom {
}
