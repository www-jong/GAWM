package com.cute.gawm.domain.user.dto;

import com.cute.gawm.domain.user.entity.User;
import lombok.Getter;
import java.io.Serializable;
@Getter
public class SessionUser implements Serializable {

    private int id;
    private String nickname;
    private String email;
    private String gender;
    private int age;

    SessionUser(){};

    public SessionUser(User user) {
        this.id=user.getUserId();
        this.nickname=user.getNickname();
        this.email=user.getEmail();
    }
}
