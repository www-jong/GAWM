package com.cute.gawm.domain.lookbook.repository;

import com.cute.gawm.domain.lookbook.entity.Lookbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LookbookRepository extends JpaRepository<Lookbook, Integer>, LookbookRepositoryCustom {
    Lookbook getByLookbookId(int lookbookId);
}
