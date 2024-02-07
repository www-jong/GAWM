package com.cute.gawm.domain.lookbook.repository;

import com.cute.gawm.domain.lookbook.entity.Lookbook;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public interface LookbookRepositoryCustom {
       PageImpl<Lookbook> findAllLookbook(Pageable pageable);

}
