package com.cute.gawm.common.util;

import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.common.response.PagingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

public class ResponseUtil {

    public static ResponseEntity<BasicResponse> buildBasicResponse(HttpStatus status, Object data) {
        BasicResponse basicResponse = new BasicResponse(status.value(), data);
        return new ResponseEntity<>(basicResponse, status);
    }

    public static ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String errorName, String message) {
        ErrorResponse errorResponse = new ErrorResponse(status.value(), errorName, message);
        return new ResponseEntity<>(errorResponse, status);
    }

    public static ResponseEntity<PagingResponse> buildPagingResponse(
            HttpStatus status, PagingResponse pagingResponse) {
        return new ResponseEntity<>(pagingResponse, status);
    }

    public static ResponseEntity<PagingResponse> buildPagingResponse(
            HttpStatus status,
            List<?> content,
            boolean isFirst,
            boolean isLast,
            int page,
            int totalPage,
            int size,
            boolean sorted,
            boolean asc,
            boolean filtered) {

        PagingResponse pagingResponse = new PagingResponse(
                status.value(),
                content,
                isFirst,
                isLast,
                page,
                totalPage,
                size,
                sorted,
                asc,
                filtered
        );
        return new ResponseEntity<>(pagingResponse, status);
    }
}
