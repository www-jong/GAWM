package com.cute.gawm.domain.lookbook.repository;

import com.cute.gawm.common.QueryDslSupport;

import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.lookbook.entity.QLookbook;
import com.cute.gawm.domain.tag.entity.QTag;
import com.cute.gawm.domain.tag_lookbook.entity.QTagLookbook;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
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
}
