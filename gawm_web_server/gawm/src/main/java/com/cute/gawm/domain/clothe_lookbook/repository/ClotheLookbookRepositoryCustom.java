package com.cute.gawm.domain.clothe_lookbook.repository;

import com.cute.gawm.domain.clothe_lookbook.entity.ClotheLookbook;

import java.util.List;

public interface ClotheLookbookRepositoryCustom {
    List<ClotheLookbook> getAllByLookbookId(int lookbookId);

}
