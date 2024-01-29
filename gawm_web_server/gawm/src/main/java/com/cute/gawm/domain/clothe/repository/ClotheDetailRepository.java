package com.cute.gawm.domain.clothe.repository;

import com.cute.gawm.domain.clothe.entity.ClotheDetail;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClotheDetailRepository extends MongoRepository<ClotheDetail, String> {

    ClotheDetail findByClotheId(long clotheId);
}