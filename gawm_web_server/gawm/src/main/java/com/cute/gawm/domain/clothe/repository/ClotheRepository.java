package com.cute.gawm.domain.clothe.repository;

import com.cute.gawm.domain.clothe.document.ClotheMongo;
import com.cute.gawm.domain.clothe.entity.Clothe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClotheRepository extends MongoRepository<ClotheMongo, String> {

}
