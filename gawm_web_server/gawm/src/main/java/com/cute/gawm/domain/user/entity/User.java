package com.cute.gawm.domain.user.entity;


import com.cute.gawm.domain.user.dto.UserEditForm;
import lombok.AllArgsConstructor;
import lombok.Builder;
import com.cute.gawm.common.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Entity
@Table(name = "user")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    @Column
    private String email;
    @Column
    private int age;
    @Enumerated(EnumType.STRING)
    @Column
    private Gender gender;
    @Column
    private String nickname;
    @Enumerated(EnumType.STRING)
    @Column
    private Role role;
    @Column
    private int point = 0;
    @Column
    private int level = 1;
    @Column
    private String session;
    @Column(name = "profile_img")
    private String profileImg;

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
