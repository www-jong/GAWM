package com.cute.gawm.domain.stylelog.controller;


import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import com.cute.gawm.domain.stylelog.service.StylelogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stylelog")
public class StylelogController {

    @Autowired
    private StylelogService stylelogService;

    @GetMapping("/list")
    public ResponseEntity<?> getStylelogsByMonth(@RequestParam("year") int year, @RequestParam("month") int month) {
        try {
            List<Stylelog> stylelogs = stylelogService.getStylelogsByMonth(year, month);
            PagingResponse pagingResponse = new PagingResponse(
                    HttpStatus.OK.value(),
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

            return ResponseEntity.ok(pagingResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"NotFoundException","데이터 처리 실패" + e.getMessage()));
        }
    }
}
