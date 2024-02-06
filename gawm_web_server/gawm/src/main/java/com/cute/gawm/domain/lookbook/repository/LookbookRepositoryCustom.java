package com.cute.gawm.domain.lookbook.repository;

import com.cute.gawm.domain.lookbook.entity.Lookbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LookbookRepositoryCustom {
//    <Lookbook> getAllLookbook(Pageable pageable);
       PageImpl<Lookbook> findAllLookbook(Pageable pageable);

}
