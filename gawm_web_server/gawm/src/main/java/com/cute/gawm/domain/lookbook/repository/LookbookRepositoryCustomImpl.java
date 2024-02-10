package com.cute.gawm.domain.lookbook.repository;

import com.cute.gawm.common.util.QueryDslSupport;
import com.cute.gawm.domain.clothes.entity.QClothes;
import com.cute.gawm.domain.clothes_lookbook.entity.QClothesLookbook;
import com.cute.gawm.domain.like.entity.QLikes;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.Timestamp;
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
    public PageImpl<Lookbook> searchLookbook(String keyword, Pageable pageable) {
        JPAQuery<?> where = queryFactory.from(QClothesLookbook.clothesLookbook)
                .leftJoin(QClothesLookbook.clothesLookbook.lookbook, lookbook)
                .leftJoin(QClothesLookbook.clothesLookbook.clothes, QClothes.clothes)
                .where(
                        QClothes.clothes.name.contains(keyword)
                                .or(QClothes.clothes.brand.contains(keyword))
                                );


        List<Lookbook> lookbookList = Objects.requireNonNull(getQuerydsl())
                .applyPagination(pageable, where)
                .select(lookbook)
                .fetch();

        long count = Objects.requireNonNull(getQuerydsl())
                .applyPagination(pageable, where)
                .select(lookbook)
                .fetchCount();

        return new PageImpl<>(lookbookList, pageable, count);
    }

    @Override
    public List<Lookbook> findTopLookbook(Timestamp startDate, Timestamp endDate) {
        return queryFactory.select(lookbook)
                .from(QLikes.likes)
                .join(QLikes.likes.lookbook, lookbook)
                .where(lookbook.createdAt.between(startDate, endDate))
                .groupBy(lookbook)
                .orderBy(QLikes.likes.count().desc())
                .limit(15)
                .fetch();
    }
}
