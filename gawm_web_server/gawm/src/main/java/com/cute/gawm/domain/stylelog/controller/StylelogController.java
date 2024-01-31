package com.cute.gawm.domain.stylelog.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.stylelog.dto.request.StylelogCreateRequest;
import com.cute.gawm.domain.stylelog.dto.response.StylelogsResponse;
import com.cute.gawm.domain.stylelog.service.StylelogService;
import com.cute.gawm.domain.user.dto.SessionUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stylelog")
public class StylelogController {

    @Autowired
    private StylelogService stylelogService;


    // 년도의  월별 스타일로그 데이터
    @GetMapping("/list")
    public ResponseEntity<?> getStylelogsByYear(
            @RequestParam(value = "year" ,defaultValue = "#{T(java.time.LocalDate).now().getYear()}") int year,
            @LoginUser SessionUser sessionUser) {
        try {
            Map<String, List<StylelogsResponse>> stylelogs = stylelogService.getStylelogsByYear(year, sessionUser.getId());
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, stylelogs);
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,"NotFoundException","데이터 처리 실패: " + e.getMessage());
        }
    }

    // 년-월 스타일로그 데이터
    @GetMapping(value="/list", params={"year","month"})
    public ResponseEntity<?> getStylelogByYearAndMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month,
            @LoginUser SessionUser sessionUser) {
        try {
            List<StylelogsResponse> stylelogs = stylelogService.getStylelogByYearAndMonth(year, month, sessionUser.getId());
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, stylelogs);
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,"NotFoundException","데이터 처리 실패: " + e.getMessage());
        }
    }

    // 스타일로그ID로 스타일로그 세부 조회
    @GetMapping("/{stylelogId}")
    public ResponseEntity<?> getStylelogDetail(
            @PathVariable("stylelogId") int calendarId) {
        try {
            StylelogsResponse stylelogDetail = stylelogService.getStylelogDetail(calendarId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, stylelogDetail);
        } catch (EntityNotFoundException e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.NOT_FOUND, "NotFoundException", "스타일로그를 찾을 수 없습니다.");
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "DataProcessingException", "데이터 처리 실패: " + e.getMessage());
        }
    }
    // 스타일로그ID로 삭제
    @DeleteMapping("/{stylelogId}")
    public ResponseEntity<?> deleteStylelog(@PathVariable int stylelogId) {
        try {
            stylelogService.deleteStylelog(stylelogId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "삭제완료");
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,"스타일로그 삭제 실패", e.getMessage());
        }
    }

    // 스타일로그 생성
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

    // 스타일로그 수정
    @PatchMapping("/{stylelogId}")
    public ResponseEntity<?> updateStylelog(
            @PathVariable int stylelogId,
            @RequestBody StylelogsResponse stylelogsResponse) {
        try {
            stylelogService.updateStylelog(stylelogId, stylelogsResponse);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "스타일로그가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "UpdateFailureException", "업데이트 처리 실패: " + e.getMessage());
        }
    }
}
