package com.cute.gawm.domain.live.repository;

import com.cute.gawm.common.util.QueryDslSupport;
import com.cute.gawm.domain.live.entity.QLive;
import com.cute.gawm.domain.live.entity.Live;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Objects;

@Repository
public class LiveRepositoryCustomImpl extends QueryDslSupport implements LiveRepositoryCustom {

    @Autowired
    public LiveRepositoryCustomImpl(EntityManager entityManager) {
        super(Live.class, entityManager);
    }


    @Override
    public PageImpl<Live> findAllLive(Pageable pageable) {
        JPAQuery<?> query = queryFactory.from(QLive.live);

        final Long count = queryFactory.select(QLive.live.count())
                .from(QLive.live)
                .fetchOne();

        List<Live> liveList = Objects.requireNonNull(getQuerydsl())
                .applyPagination(pageable, query)
                .select(QLive.live)
                .fetch();


        return new PageImpl<>(liveList, pageable, count);
    }
}
