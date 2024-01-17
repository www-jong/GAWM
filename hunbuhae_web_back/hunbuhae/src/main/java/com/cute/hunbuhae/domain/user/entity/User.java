package com.cute.hunbuhae.domain.user.entity;

import com.cute.hunbuhae.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
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
    private ROLE role;
    public enum GENDER{
        MALE, FEMALE
    }
    public enum ROLE{
        ROLE_ADMIN, ROLE_USER
    }
}
