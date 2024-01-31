package com.cute.gawm.domain.following.controller;

import com.cute.gawm.common.Response;
import com.cute.gawm.common.config.auth.LoginUser;
import com.cute.gawm.domain.clothe.service.ClotheService;
import com.cute.gawm.domain.following.service.FollowService;
import com.cute.gawm.domain.user.controller.UserController;
import com.cute.gawm.domain.user.entity.SessionUser;
import com.cute.gawm.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Slf4j
public class FollowController {

    private final FollowService followService;

    @PostMapping("/follow")
    public Response follow(@LoginUser SessionUser sessionUser,int FollowId){
        followService.saveFollow(sessionUser.getId(),FollowId);
        return new Response(HttpStatus.OK.value(),null);
    }
}
