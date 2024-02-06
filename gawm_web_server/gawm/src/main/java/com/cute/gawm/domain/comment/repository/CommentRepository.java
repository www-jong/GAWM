package com.cute.gawm.domain.comment.repository;

import com.cute.gawm.domain.clothes_lookbook.repository.ClothesLookbookRepositoryCustom;
import com.cute.gawm.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>, CommentRepositoryCustom {
}
