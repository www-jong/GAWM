package com.cute.gawm.domain.lookbook_image.repository;

import com.cute.gawm.domain.lookbook_image.entity.LookbookImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LookbookImageRepository extends JpaRepository<LookbookImage, Integer> {
//    List<LookbookImage> findByLookbook(Integer lookbookId);
//    List<LookbookImage> findLookbookImageByLookbook(Integer lookbookId);
    List<LookbookImage> findAllByLookbook_LookbookId(Integer lookbookId);
    void deleteAllByLookbook(Integer lookbookId);

}
