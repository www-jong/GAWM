package com.cute.gawm.domain.clothes_lookbook.repository;

import com.cute.gawm.common.QueryDslSupport;

import com.cute.gawm.domain.clothes.entity.QClothes;
import com.cute.gawm.domain.clothes_lookbook.entity.ClothesLookbook;
import com.cute.gawm.domain.clothes_lookbook.entity.QClothesLookbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class ClothesLookbookRepositoryCustomImpl extends QueryDslSupport implements ClothesLookbookRepositoryCustom {
    @Autowired
    public ClothesLookbookRepositoryCustomImpl(EntityManager entityManager) {
        super(ClothesLookbook.class, entityManager);
    }

    @Override
    public List<ClothesLookbook> getAllByLookbookId(int lookbookId) {
        return queryFactory.selectFrom(QClothesLookbook.clothesLookbook)
                .where(QClothesLookbook.clothesLookbook.lookbook.lookbookId.eq(lookbookId))
                .leftJoin(QClothesLookbook.clothesLookbook.clothes, QClothes.clothes)
                .fetchJoin()
                .fetch();
    }
}
