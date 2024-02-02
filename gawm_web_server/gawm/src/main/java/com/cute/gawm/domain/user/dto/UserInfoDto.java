package com.cute.gawm.domain.user.dto;

import com.cute.gawm.domain.user.entity.User;
import lombok.Data;

@Data
public class UserInfoDto {

    private Integer userId;
    private String nickname;
    private String gender;
    private Integer age;
    private Integer point;
    private Integer level;
    private Integer following_num;
    private Integer follower_num;

    public UserInfoDto(User user) {
        this.userId=user.getUserId();
        this.nickname = user.getNickname();
        this.gender = (user.getGender() != null) ? user.getGender().toString() : null;
        this.age = user.getAge();
        this.point = user.getPoint();
        this.level = user.getLevel();
        this.following_num = 0;
        this.follower_num = 0;
    }
}
