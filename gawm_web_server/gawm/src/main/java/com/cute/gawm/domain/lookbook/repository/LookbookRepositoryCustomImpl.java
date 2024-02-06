package com.cute.gawm.domain.lookbook.repository;

import com.cute.gawm.common.QueryDslSupport;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Objects;

import static com.cute.gawm.domain.lookbook.entity.QLookbook.lookbook;


@Repository
public class LookbookRepositoryCustomImpl extends QueryDslSupport implements LookbookRepositoryCustom{
    @Autowired
    public LookbookRepositoryCustomImpl(EntityManager entityManager) {
        super(Lookbook.class, entityManager);
    }


    @Override
    public PageImpl<Lookbook> findAllLookbook(Pageable pageable){
        JPAQuery<?> query = queryFactory.from(lookbook);

        final Long count = queryFactory.select(lookbook.count())
                .from(lookbook)
                .fetchOne();

        List<Lookbook> lookbookList = Objects.requireNonNull(getQuerydsl())
                .applyPagination(pageable, query)
                .select(lookbook)
                .fetch();


        return new PageImpl<>(lookbookList, pageable, count);
    }

    @Override
    public PageImpl<Lookbook> findPageByUserId(Integer userId, Pageable pageable){
        JPAQuery<?> query = queryFactory.from(lookbook);

        final Long count = queryFactory.select(lookbook.count())
                .from(lookbook)
                .where(lookbook.user.userId.eq(userId))
                .fetchOne();

        List<Lookbook> lookbookList = Objects.requireNonNull(getQuerydsl())
                .applyPagination(pageable, query)
                .select(lookbook)
                .fetch();


        return new PageImpl<>(lookbookList, pageable, count);
    }
}
