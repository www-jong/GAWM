package com.cute.gawm.domain.user.entity;


import com.cute.gawm.domain.user.UserEditForm;
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
    private Integer id;
    @Column
    private String email;
    @Column
    private Integer age;
    @Enumerated(EnumType.STRING)
    @Column
    private Gender gender;
    @Column
    private String nickname;
    @Enumerated(EnumType.STRING)
    @Column
    private Role role;
    @Column
    private Integer point;
    @Column
    private Integer level;
    //이거 빼나?
    @Column(name = "following_num")
    private Integer followingNum;
    @Column(name = "follower_num")
    private Integer followerNum;
    @Column
    private String session;

    public User() {

    }

    public enum Gender {
        MALE, FEMALE, NONE
    }

    public User update(String email) {
        this.email = email;
        return this;
    }
    public void update(UserEditForm form){
        this.nickname=form.getNickname();
        this.gender=form.getGender();
        this.age=form.getAge();
    }

    public String getRoleKey() {
        return this.role.getKey();
    }


}
