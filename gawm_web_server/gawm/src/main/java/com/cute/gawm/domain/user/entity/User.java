package com.cute.gawm.domain.user.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import com.cute.gawm.common.BaseEntity;
import lombok.Getter;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@Getter @Entity
@Table(name = "user")
public class User extends BaseEntity {
    @Id
    @GeneratedValue
    @Column
    private long id;
    @Column
    private String session;
    @Column
    private String email;
    @Column
    private String nickname;
    @Column
    private Integer age;
    @Enumerated(EnumType.STRING)
    @Column
    private Gender gender;
    @Column(name = "following_num")
    private Integer followingNum;
    @Column(name = "follower_num")
    private Integer followerNum;
    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    public User() {

    }

    public enum Gender {
        MALE, FEMALE
    }

    public User update(String email) {
        this.email = email;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
