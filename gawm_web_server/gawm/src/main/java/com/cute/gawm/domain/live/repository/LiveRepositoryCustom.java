package com.cute.gawm.domain.live.repository;

import com.cute.gawm.domain.live.entity.Live;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public interface LiveRepositoryCustom {

    PageImpl<Live> findAllLive(Pageable pageable);
}
