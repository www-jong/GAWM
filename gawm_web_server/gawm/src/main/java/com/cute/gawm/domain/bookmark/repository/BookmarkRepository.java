package com.cute.gawm.domain.bookmark.repository;

import com.cute.gawm.domain.bookmark.entity.Bookmark;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark,Integer> {
    void deleteByLookbookLookbookId(Integer lookbookId);

    boolean existsByLookbookAndUserUserId(Lookbook lookbook,Integer userId);
}
