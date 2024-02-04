package com.cute.gawm.domain.tag_lookbook.repository;

import com.cute.gawm.domain.tag.entity.Tag;
import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagLookbookRepository extends JpaRepository<TagLookbook,Integer> {
    void deleteByLookbookLookbookId(Integer lookbookId);
}
