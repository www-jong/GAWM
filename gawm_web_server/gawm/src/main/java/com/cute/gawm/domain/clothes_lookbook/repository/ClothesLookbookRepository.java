package com.cute.gawm.domain.clothes_lookbook.repository;

import com.cute.gawm.domain.clothes_lookbook.entity.ClothesLookbook;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothesLookbookRepository extends JpaRepository<ClothesLookbook, Integer>, ClothesLookbookRepositoryCustom {
    void deleteAllByLookbook(Lookbook lookbook);

}
