package com.cute.gawm.domain.tag_lookbook.repository;

import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TagLookbookRepository extends JpaRepository<TagLookbook, Integer>, TagLookbookRepositoryCustom {
    void deleteByTagLookbookId(Integer tagLookbookId);
}
