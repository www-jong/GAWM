package com.cute.gawm.domain.tag_lookbook.repository;

import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagLookbookRepository extends JpaRepository<TagLookbook, Integer>, TagLookbookRepositoryCustom {
    void deleteByTagLookbookId(Integer tagLookbookId);
}
