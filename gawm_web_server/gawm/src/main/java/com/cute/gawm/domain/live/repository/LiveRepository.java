package com.cute.gawm.domain.live.repository;

import com.cute.gawm.domain.live.entity.Live;
import com.cute.gawm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LiveRepository extends JpaRepository<Live, Integer> {
    Live findByUser(User user);
}
