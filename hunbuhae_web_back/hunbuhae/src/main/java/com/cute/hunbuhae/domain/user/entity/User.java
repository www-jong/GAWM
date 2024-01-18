package com.cute.hunbuhae.domain.user.entity;

import com.cute.hunbuhae.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
    private String session;
    private String name;
    private Integer age;
    @Enumerated(EnumType.STRING)
    private GENDER gender;
    private String nickname;
    @Column(name = "following_num")
    private Integer followingNum;
    @Column(name = "follower_num")
    private Integer followerNum;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    public User() {

    }

    public enum GENDER{
        MALE, FEMALE
    }

    public User update(String name) {
        this.name = name;
        return this;
    }
    public String getRoleKey() {
        return this.role.getKey();
    }
}
