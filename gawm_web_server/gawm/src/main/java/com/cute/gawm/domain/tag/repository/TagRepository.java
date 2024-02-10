package com.cute.gawm.domain.tag.repository;

import com.cute.gawm.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    boolean existsByName(String name);

    Tag findByName(String tagName);
}
