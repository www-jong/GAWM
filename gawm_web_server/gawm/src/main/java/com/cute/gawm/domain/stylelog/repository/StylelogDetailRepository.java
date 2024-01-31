package com.cute.gawm.domain.stylelog.repository;

import com.cute.gawm.domain.clothes.entity.ClothesDetail;
import com.cute.gawm.domain.stylelog.entity.StylelogDetail;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StylelogDetailRepository extends MongoRepository<StylelogDetail, Integer> {
    StylelogDetail findByStylelogId(Integer stylelogId);
    StylelogDetail deleteByStylelogId(Integer stylelogId);
}