package com.cute.gawm.domain.live.repository;

import com.cute.gawm.domain.live.entity.Live;
import com.cute.gawm.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LiveRepository extends JpaRepository<Live, Integer> {
    List<Live> findByUser(User user);

    Live findByUserAndIsDeletedFalse(User user);

    Live findByLiveId(Integer liveId);

    void deleteByLiveId(Integer liveId);

    Live findLiveByUser(User user);

}
