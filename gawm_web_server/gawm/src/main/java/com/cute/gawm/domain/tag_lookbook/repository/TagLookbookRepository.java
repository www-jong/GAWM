package com.cute.gawm.domain.tag_lookbook.repository;

import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagLookbookRepository extends JpaRepository<TagLookbook,Integer> {

    void deleteByTagLookbookId(Integer tagLookbookId);
}
