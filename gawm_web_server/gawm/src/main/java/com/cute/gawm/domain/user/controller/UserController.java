package com.cute.gawm.domain.user.controller;


import com.cute.gawm.common.config.auth.LoginUser;
import com.cute.gawm.domain.user.entity.SessionUser;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.service.UserService;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final HttpSession httpSession;
    private final UserService userService;
//    @GetMapping("/") //home 호출하는 api였음
//    public String index(Model model, @LoginUser SessionUser user) {
//
//        if (user != null) {
//            log.info("user={}", user.getNickname());
//            model.addAttribute("userName", user.getNickname());
//        }
//        return "index";
//    }

    @GetMapping("/test")
    public String test(){
        return "테스트";
    }

    @GetMapping("/userInfo")
    public UserInfoDto userInfo(Model model, @LoginUser SessionUser sessionUser) {
        User user = userService.findOne(sessionUser.getId());
        log.info("sessionUser.getId()={}",sessionUser.getId());
        log.info("user={}",user);
        return new UserInfoDto(user);
    }

    @Data
    static class UserInfoDto {
        private String nickname;
        private String gender;
        private Integer age;
        private Integer point;
        private Integer level;
        private Integer following_num;
        private Integer follower_num;

        public UserInfoDto(User user) {
            this.nickname = user.getNickname();
            this.gender = (user.getGender() != null) ? user.getGender().toString() : null;
            this.age = user.getAge();
            this.point = user.getPoint();
            this.level = user.getLevel();
            this.following_num = user.getFollowingNum();
            this.follower_num = user.getFollowerNum();
        }
    }

}
