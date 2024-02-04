package com.cute.gawm.domain.tag_lookbook.repository;

import com.cute.gawm.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagLookbookRepository extends JpaRepository<Tag,Integer> {
//    void deleteByTagLookbookId(Integer taglookbookId);
}
