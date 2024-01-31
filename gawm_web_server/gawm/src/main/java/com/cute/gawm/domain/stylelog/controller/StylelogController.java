package com.cute.gawm.domain.stylelog.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.stylelog.dto.response.StylelogCreateRequest;
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

    @GetMapping("/list")
    public ResponseEntity<?> getStylelogsByMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month,
            @LoginUser SessionUser sessionUser) {
        try {
            List<Stylelog> stylelogs = stylelogService.getStylelogsByMonth(year, month,sessionUser.getId());

            return ResponseUtil.buildPagingResponse(HttpStatus.OK,
                    stylelogs,
                    true, // isFirst
                    true, // isLast
                    0, // page
                    1, // totalPage
                    stylelogs.size(), // size
                    false, // sorted
                    false, // asc
                    false // filtered
                    );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"NotFoundException","데이터 처리 실패" + e.getMessage()));
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
