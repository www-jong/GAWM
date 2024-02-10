package com.cute.gawm.common;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import javax.persistence.EntityManager;

public class QueryDslSupport extends QuerydslRepositorySupport {

    protected JPAQueryFactory queryFactory;

    public QueryDslSupport(Class<?> clazz, EntityManager entityManager) {
        super(clazz);
        super.setEntityManager(entityManager);

        this.queryFactory = new JPAQueryFactory(entityManager);
    }

}