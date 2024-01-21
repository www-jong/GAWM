package com.cute.hunbuhae.domain.user.entity;

import lombok.Getter;
import java.io.Serializable;
@Getter
public class SessionUser implements Serializable {

    private String name;
    private String email;
    private String gender;
    private Integer age;

    SessionUser(){};

    public SessionUser(User user) {
        this.name = user.getName();
        this.email=user.getEmail();
    }
}
