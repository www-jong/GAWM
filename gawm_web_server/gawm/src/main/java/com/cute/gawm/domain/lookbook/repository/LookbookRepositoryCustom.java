package com.cute.gawm.domain.lookbook.repository;

import com.cute.gawm.domain.lookbook.entity.Lookbook;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.sql.Timestamp;
import java.util.List;

public interface LookbookRepositoryCustom {
       PageImpl<Lookbook> findAllLookbook(Pageable pageable);
       PageImpl<Lookbook> findAllLookbookByUserId(int userId, Pageable pageable);
       PageImpl<Lookbook> searchLookbook(String keyword, Pageable pageable);
       List<Lookbook> findTopLookbook(Timestamp startDate, Timestamp endDate);
}
