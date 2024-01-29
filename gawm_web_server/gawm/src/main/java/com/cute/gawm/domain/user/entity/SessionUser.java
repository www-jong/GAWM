package com.cute.gawm.domain.user.entity;

import lombok.Getter;
import java.io.Serializable;
@Getter
public class SessionUser implements Serializable {

    private Integer id;
    private String nickname;
    private String email;
    private String gender;
    private Integer age;

    SessionUser(){};

    public SessionUser(User user) {
        this.id=user.getId();
        this.nickname=user.getNickname();
        this.email=user.getEmail();
    }
}
