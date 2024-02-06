package com.cute.gawm.domain.clothes_lookbook.repository;

import com.cute.gawm.domain.clothes_lookbook.entity.ClothesLookbook;

import java.util.List;

public interface ClothesLookbookRepositoryCustom {
    List<ClothesLookbook> getAllByLookbookId(int lookbookId);

}
