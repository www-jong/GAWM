package com.cute.gawm.domain.stylelog.repository;

import com.cute.gawm.domain.stylelog.entity.StylelogDetail;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StylelogDetailRepository extends MongoRepository<StylelogDetail, Integer> {
    StylelogDetail findByStylelogId(int stylelogId);
    StylelogDetail deleteByStylelogId(Integer stylelogId);
}