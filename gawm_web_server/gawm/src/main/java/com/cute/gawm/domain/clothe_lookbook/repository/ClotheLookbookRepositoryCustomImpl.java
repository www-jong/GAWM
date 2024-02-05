package com.cute.gawm.domain.clothe_lookbook.repository;

import com.cute.gawm.common.QueryDslSupport;
import com.cute.gawm.domain.clothe.entity.QClothe;
import com.cute.gawm.domain.clothe_lookbook.entity.ClotheLookbook;
import com.cute.gawm.domain.clothe_lookbook.entity.QClotheLookbook;
import com.cute.gawm.domain.lookbook.entity.QLookbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

import static com.cute.gawm.domain.lookbook.entity.QLookbook.lookbook;

@Repository
public class ClotheLookbookRepositoryCustomImpl extends QueryDslSupport implements ClotheLookbookRepositoryCustom {
    @Autowired
    public ClotheLookbookRepositoryCustomImpl(EntityManager entityManager) {
        super(ClotheLookbook.class, entityManager);
    }

    @Override
    public List<ClotheLookbook> getAllByLookbookId(int lookbookId) {
        return queryFactory.selectFrom(QClotheLookbook.clotheLookbook)
                .where(QClotheLookbook.clotheLookbook.lookbook.lookbookId.eq(lookbookId))
                .leftJoin(QClotheLookbook.clotheLookbook.clothe, QClothe.clothe)
                .fetchJoin()
                .fetch();
    }
}
