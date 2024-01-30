package com.cute.gawm.domain.lookbook.repository;

import com.cute.gawm.common.QueryDslSupport;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class LookbookRepositoryCustomImpl extends QueryDslSupport implements LookbookRepositoryCustom{
    public LookbookRepositoryCustomImpl(Class<?> clazz, EntityManager entityManager) {
        super(clazz, entityManager);
    }
}
