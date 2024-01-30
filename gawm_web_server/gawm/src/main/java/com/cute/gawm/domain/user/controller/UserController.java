package com.cute.gawm.domain.user.controller;


import com.cute.gawm.common.Response;
import com.cute.gawm.common.config.auth.LoginUser;
import com.cute.gawm.domain.user.UserEditForm;
import com.cute.gawm.domain.user.entity.SessionUser;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/userInfo")
    public Response userInfo(@LoginUser SessionUser sessionUser) {
        User user = userService.findOne(sessionUser.getId());
        log.info("sessionUser.getId()={}",sessionUser.getId());
        log.info("user={}",user);
        return new Response(HttpStatus.OK.value(),new UserInfoDto(user));
    }

    @PatchMapping("/userInfo")
    public Response edit(UserEditForm form, @LoginUser SessionUser sessionUser) throws IOException {
        userService.updateMember(sessionUser.getId(),form);
        return new Response(HttpStatus.OK.value(),null);
    }

    @Data
    static class UserInfoDto {
        private String nickname;
        private String gender;
        private Integer age;
        private Integer point;
        private Integer level;

        public UserInfoDto(User user) {
            this.nickname = user.getNickname();
            this.gender = (user.getGender() != null) ? user.getGender().toString() : null;
            this.age = user.getAge();
            this.point = user.getPoint();
            this.level = user.getLevel();
        }
    }

}
