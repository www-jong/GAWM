package com.cute.gawm.domain.stylelog.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.stylelog.dto.request.StylelogUpdateRequest;
import com.cute.gawm.domain.stylelog.dto.request.StylelogCreateRequest;
import com.cute.gawm.domain.stylelog.dto.response.StylelogDetailResponse;
import com.cute.gawm.domain.stylelog.service.StylelogService;
import com.cute.gawm.domain.user.dto.SessionUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/back/stylelog")
public class StylelogController {

    @Autowired
    private StylelogService stylelogService;


    // 스타일로그 생성
    @PostMapping
    public ResponseEntity<?> createStylelog(
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") StylelogCreateRequest request,
            @LoginUser SessionUser sessionUser) {
        stylelogService.createStylelog(request,image, sessionUser.getId());
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "스타일로그 등록 완료.");

    }

    //id로 스타일로그 조회
    @GetMapping("/{stylelogId}")
    public ResponseEntity<?> getStylelogDetail(@Valid @PathVariable int stylelogId) {
        StylelogDetailResponse stylelogDetail = stylelogService.getStylelogDetail(stylelogId);
        return ResponseUtil.buildBasicResponse(org.springframework.http.HttpStatus.OK, stylelogDetail);

    }

    // 년도로 스타일로그 조회
    @GetMapping("/list")
    public ResponseEntity<?> getStylelogsByYear(
            @RequestParam(value = "year", defaultValue = "#{T(java.time.LocalDate).now().getYear()}") int year,
            @LoginUser SessionUser sessionUser) {
        Map<String, List<StylelogDetailResponse>> stylelogsGroupedByMonth =
                stylelogService.getStylelogsByYearGroupedByMonth(year, sessionUser.getId());
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, stylelogsGroupedByMonth);

    }

    // 년-월로 스타일로그 조회
    @GetMapping(value = "/list", params = {"year", "month"})
    public ResponseEntity<?> getStylelogByYearAndMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month,
            @LoginUser SessionUser sessionUser) {
        List<StylelogDetailResponse> details = stylelogService.getStylelogsByYearAndMonth(year, month, sessionUser.getId());
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, details);

    }

    // id로 스타일로그 삭제
    @DeleteMapping("/{stylelogId}")
    public ResponseEntity<?> deleteStylelog(@PathVariable int stylelogId,
                                            @LoginUser SessionUser sessionUser) {
        stylelogService.deleteStylelog(stylelogId, sessionUser.getId());
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "스타일로그 삭제 완료.");

    }

    // id로 스타일로그 수정
    @PatchMapping("/{stylelogId}")
    public ResponseEntity<?> updateStylelog(@PathVariable("stylelogId") int stylelogId,
                                            @RequestBody StylelogUpdateRequest request,
                                            @LoginUser SessionUser sessionUser) {
        stylelogService.updateStylelog(stylelogId, request, sessionUser.getId());
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "스타일로그가 성공적으로 업데이트되었습니다.");

    }
}
