package com.cute.gawm.domain.user.dto;

import com.cute.gawm.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserEditForm {
    private User.Gender gender;
    private Integer age;
}