package com.cute.gawm.common.exception;

import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.common.util.ResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ApiExceptionController {
    @ResponseStatus(HttpStatus.UNAUTHORIZED) //401
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> illegalExHandle(IllegalArgumentException e) {
        log.error("[exceptionHandle] ex={}", e.getMessage());
        return ResponseUtil.buildErrorResponse(HttpStatus.UNAUTHORIZED, "IllegalArgumentException", "데이터 처리 실패: " + e.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED) //401
    @ExceptionHandler(IllegalStateException.class)
    public ErrorResponse illegalExHandle(IllegalStateException e) {
        log.error("[exceptionHandle] ex={}", e.getMessage());
        return new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), "IllegalStateException",e.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED) //401
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<?> dataNotFoundException(DataNotFoundException e) {
        log.error("[exceptionHandle] ex={}", e.getMessage());
        return ResponseUtil.buildErrorResponse(HttpStatus.NOT_FOUND,"DataNotFoundException",e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) //500
    @ExceptionHandler(DataMismatchException.class)
    public ErrorResponse datamismatchExHandle(DataMismatchException e) {
        log.error("[exceptionHandle] ex={}", e.getMessage());
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "DataMismatchException",e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) //500
    @ExceptionHandler(RuntimeException.class)
    public ErrorResponse datamismatchExHandle(RuntimeException e) {
        log.error("[exceptionHandle] ex={}", e.getMessage());
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "RuntimeException",e.getMessage());
    }
}
