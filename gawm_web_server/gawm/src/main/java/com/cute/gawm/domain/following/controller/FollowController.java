package com.cute.gawm.domain.following.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.exception.DataMismatchException;
import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.following.service.FollowService;
import com.cute.gawm.domain.user.controller.UserController;
import com.cute.gawm.domain.user.dto.SessionUser;
import com.cute.gawm.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/back")
@Slf4j
public class FollowController {

    private final FollowService followService;
    @PostMapping("/follow")
    public ResponseEntity<?> follow(@LoginUser SessionUser sessionUser, int followId) {
        followService.saveFollow(sessionUser.getId(), followId);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, null);

    }
}