package com.cute.gawm.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ApiExceptionController {
    @ResponseStatus(HttpStatus.UNAUTHORIZED) //401
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResponse illegalExHandle(IllegalArgumentException e) {
        log.error("[exceptionHandle] ex={}", e.getMessage());
        return new ErrorResponse(HttpStatus.UNAUTHORIZED.value(),"IllegalArgumentException", e.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED) //401
    @ExceptionHandler(IllegalStateException.class)
    public ErrorResponse illegalExHandle(IllegalStateException e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), "IllegalStateException",e.getMessage());
    }
}
