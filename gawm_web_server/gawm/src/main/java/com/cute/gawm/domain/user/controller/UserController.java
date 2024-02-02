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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/userInfo")
    public ResponseEntity<?> userInfo(@LoginUser SessionUser sessionUser) {
        UserInfoDto userInfo = userService.getUserInfo(sessionUser.getId());
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, userInfo);
    }

    @PatchMapping("/userInfo")
    public ResponseEntity<?> edit(UserEditForm form, @LoginUser SessionUser sessionUser) throws IOException {
        userService.updateMember(sessionUser.getId(), form);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, null);
    }

    @GetMapping
    public ResponseEntity<?> search(@LoginUser SessionUser sessionUser, String keyword,
                                    @RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    String sortBy,
                                    @RequestParam(defaultValue = "asc") String sortDirection) {

        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = sortBy != null ? Sort.by(direction, sortBy) : Sort.unsorted();

        PagingResponse pagingResponse = userService.search(sessionUser.getId(), keyword, page, size, sort);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, pagingResponse);
    }

    @GetMapping("/following")
    public ResponseEntity<?> getfollowing(@LoginUser SessionUser sessionUser, String keyword,
                                          @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size,
                                          @RequestParam(defaultValue = "create_at") String sortBy,
                                          @RequestParam(defaultValue = "asc") String sortDirection) {
        try {
            PagingResponse pagingResponse = userService.getFollowings(sessionUser.getId(), page, size, sortBy, sortDirection);
            return ResponseUtil.buildPagingResponse(HttpStatus.OK, pagingResponse);
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "NotFoundException", "데이터 처리 실패: " + e.getMessage());
        }
    }

    @GetMapping("/follower")
    public ResponseEntity<?> getfollower(@LoginUser SessionUser sessionUser, String keyword,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "10") int size,
                                         @RequestParam(defaultValue = "create_at") String sortBy,
                                         @RequestParam(defaultValue = "asc") String sortDirection) {
        PagingResponse pagingResponse = userService.getFollowers(sessionUser.getId(), page, size, sortBy, sortDirection);
        return ResponseUtil.buildPagingResponse(HttpStatus.OK, pagingResponse);
    }

    @PatchMapping("/profile_img")
    public ResponseEntity<?> updateProfileImge(@LoginUser SessionUser sessionUser, MultipartFile multipartFile) throws IOException {
            log.info("multipartFile={}", multipartFile);
            String profileImg = userService.updateProfileImg(sessionUser.getId(), multipartFile);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, profileImg);
    }
}
