package com.cute.gawm.domain.stylelog.repository;

import com.cute.gawm.domain.clothes.entity.ClothesDetail;
import com.cute.gawm.domain.stylelog.entity.StylelogDetail;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StylelogDetailRepository extends MongoRepository<StylelogDetail, String> {
    StylelogDetail findByStylelogId(String stylelogId);
}