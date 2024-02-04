package com.cute.gawm.domain.user.repository;


import com.cute.gawm.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsById(Integer id);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Integer id);

    Optional<User> findByNickname(String nickname);

    Page<User> findByNicknameContainingAndUserIdNot(String nickname, Integer id, Pageable pageable);
}