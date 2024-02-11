package com.cute.gawm.domain.comment.repository;

import com.cute.gawm.common.util.QueryDslSupport;
import com.cute.gawm.domain.clothes_lookbook.entity.ClothesLookbook;
import com.cute.gawm.domain.comment.entity.Comment;
import com.cute.gawm.domain.comment.entity.QComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class CommentRepositoryCustomImpl extends QueryDslSupport implements CommentRepositoryCustom {
    @Autowired
    public CommentRepositoryCustomImpl(EntityManager entityManager) {
        super(ClothesLookbook.class, entityManager);
    }

    @Override
    public List<Comment> getAllByLookbookId(Integer lookbookId) {
        return queryFactory.selectFrom(QComment.comment)
                .where(QComment.comment.lookbook.lookbookId.eq(lookbookId))
                .fetch();
    }
}
