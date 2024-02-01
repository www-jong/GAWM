package com.cute.gawm.domain.user.controller;


import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.user.dto.UserEditForm;
import com.cute.gawm.domain.user.dto.SessionUser;
import com.cute.gawm.domain.user.dto.UserInfoDto;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/userInfo")
    public BasicResponse userInfo(@LoginUser SessionUser sessionUser) {
        UserInfoDto userInfo = userService.getUserInfo(sessionUser.getId());
        log.info("sessionUser.getId()={}", sessionUser.getId());
        log.info("userInfo={}", userInfo);
        return new BasicResponse(HttpStatus.OK.value(), userInfo);
    }

    @PatchMapping("/userInfo")
    public BasicResponse edit(UserEditForm form, @LoginUser SessionUser sessionUser) throws IOException {
        userService.updateMember(sessionUser.getId(), form);
        return new BasicResponse(HttpStatus.OK.value(), null);
    }

    @GetMapping
    public ResponseEntity<?> search(@LoginUser SessionUser sessionUser, String keyword,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    String sortBy,
                                    @RequestParam(defaultValue = "asc")String sortDirection) {
        try {
            log.info("keyword={}", keyword);
            log.info("sortBy={}",sortBy);
            log.info("sortDirection={}",sortDirection);


            Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;


            Sort sort = sortBy != null ? Sort.by(direction, sortBy) : Sort.unsorted();

            log.info("direction={}",direction);
            log.info("sortBy={}",sortBy);
            log.info("sort={}",sort);

            PagingResponse pagingResponse = userService.search(sessionUser.getId(), keyword, page, size, sort);
            return new ResponseEntity<>(pagingResponse, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "NotFoundException", "데이터 처리 실패: " + e.getMessage());
        }
    }
}
