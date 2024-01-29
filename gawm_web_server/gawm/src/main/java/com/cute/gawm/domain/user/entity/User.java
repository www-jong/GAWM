package com.cute.gawm.domain.user.entity;

import com.cute.gawm.common.BaseEntity;
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
    @Column
    private String session;
    @Column
    private String name;
    @Column
    private Integer age;
    @Enumerated(EnumType.STRING)
    @Column
    private GENDER gender;
    @Column
    private String nickname;
    @Column(name = "following_num")
    private Integer followingNum;
    @Column(name = "follower_num")
    private Integer followerNum;
    @Column
    private String password;
    @Enumerated(EnumType.STRING)
    @Column
    private ROLE role;
    public enum GENDER{
        MALE, FEMALE
    }
    public enum ROLE{
        ROLE_ADMIN, ROLE_USER
    }
}
