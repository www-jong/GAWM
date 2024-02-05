package com.cute.gawm.domain.tag_lookbook.repository;

import com.cute.gawm.common.QueryDslSupport;
import com.cute.gawm.domain.tag.entity.QTag;
import com.cute.gawm.domain.tag_lookbook.entity.QTagLookbook;
import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import java.util.List;

public class TagLookbookRepositoryCustomImpl extends QueryDslSupport implements TagLookbookRepositoryCustom {
    @Autowired
    public TagLookbookRepositoryCustomImpl(EntityManager entityManager){
        super(TagLookbook.class, entityManager);
    }

    @Override
    public List<TagLookbook> getAllByLookbookId(Integer lookbookId) {
        return queryFactory.selectFrom(QTagLookbook.tagLookbook)
                .where(QTagLookbook.tagLookbook.lookbook.lookbookId.eq(lookbookId))
                .leftJoin(QTagLookbook.tagLookbook.tag, QTag.tag)
                .fetchJoin()
                .fetch();
    }
}
