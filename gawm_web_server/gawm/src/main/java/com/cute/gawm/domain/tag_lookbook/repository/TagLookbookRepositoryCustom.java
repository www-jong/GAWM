package com.cute.gawm.domain.tag_lookbook.repository;

import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;

import java.util.List;

public interface TagLookbookRepositoryCustom {
    List<TagLookbook> getAllByLookbookId(Integer lookbookId);

}
