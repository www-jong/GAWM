package com.cute.gawm.domain.stylelog.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.stylelog.dto.request.StylelogCreateRequest;
import com.cute.gawm.domain.stylelog.dto.response.StylelogsByYearResponse;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import com.cute.gawm.domain.stylelog.service.StylelogService;
import com.cute.gawm.domain.user.dto.SessionUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stylelog")
public class StylelogController {

    @Autowired
    private StylelogService stylelogService;


    // 해당 년도의 모든 데이터 주기
    @GetMapping("/list")
    public ResponseEntity<?> getStylelogsByYear(
            @RequestParam("year") int year,
            @LoginUser SessionUser sessionUser) {
        try {
            List<StylelogsByYearResponse> stylelogs = stylelogService.getStylelogsByYear(year, sessionUser.getId());
            return ResponseUtil.buildBasicResponse(HttpStatus.OK,stylelogs); // isFirst, isLast 등의 값 설정
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"NotFoundException","데이터 처리 실패: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createStylelog(
            @RequestBody StylelogCreateRequest request,
            @LoginUser SessionUser sessionUser) {
        try {
            stylelogService.createStylelog(request, sessionUser.getId());
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "스타일로그 등록 완료.");
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "DataProcessingException", "데이터 처리 실패: " + e.getMessage());
        }
    }
}
