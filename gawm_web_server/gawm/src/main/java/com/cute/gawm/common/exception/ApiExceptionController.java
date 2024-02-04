package com.cute.gawm.common.exception;

import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.common.util.ResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.naming.AuthenticationException;


@Slf4j
@RestControllerAdvice
public class ApiExceptionController {

    // 잘못된 인수값 전달
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse illegalExHandle(IllegalArgumentException e) {
        return constructErrorResponse(e,HttpStatus.BAD_REQUEST,"IllegalArgumentException");
    }

    // 부적절한 객체상태오류
    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse illegalExHandle(IllegalStateException e) {
        return constructErrorResponse(e,HttpStatus.BAD_REQUEST, "IllegalStateException");
    }

    // 잘못된 요청 데이터
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationExceptions(MethodArgumentNotValidException e) {
        return constructErrorResponse(e,HttpStatus.BAD_REQUEST, "handleValidationExceptions");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ResponseStatusException.class)
    public ErrorResponse responseStatusException(ResponseStatusException e) {
        return constructErrorResponse(e,HttpStatus.BAD_REQUEST, "ResponseStatusException");
    }

    // 리소스를 찾을 수 없음
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNoHandlerFoundException(NoHandlerFoundException e) {
        return constructErrorResponse(e,HttpStatus.NOT_FOUND, "handleNoHandlerFoundException");
    }

    // 권한없음(접근거부)
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorResponse handleAccessDeniedException(AccessDeniedException e) {
        return constructErrorResponse(e,HttpStatus.FORBIDDEN, "handleAccessDeniedException");
    }

    // 권한없음(접근거부)
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorResponse handleAuthenticationException(AuthenticationException e) {
        return constructErrorResponse(e,HttpStatus.UNAUTHORIZED, "handleAuthenticationException");
    }

    // 파일업로드 에러
    @ExceptionHandler(S3FileUploadException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleFileUploadException(S3FileUploadException e) {
        return constructErrorResponse(e,HttpStatus.INTERNAL_SERVER_ERROR, "S3FileUploadException");
    }

    // 파일삭제에러
    @ExceptionHandler(S3FileDeleteException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleFileDeletionException(S3FileDeleteException e) {
        return constructErrorResponse(e,HttpStatus.INTERNAL_SERVER_ERROR, "S3FileDeleteException");
    }

    // 실행중 에러
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) //500
    public ErrorResponse handleRuntimeException(RuntimeException e) {
        return constructErrorResponse(e,HttpStatus.INTERNAL_SERVER_ERROR, "RuntimeException");
    }

    // 유저를 찾을 수 없음.
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleUserNotFoundException(UserNotFoundException ex) {
        return constructErrorResponse(ex, HttpStatus.NOT_FOUND, "UserNotFoundException");
    }

    // 옷을 찾을 수 없음
    @ExceptionHandler(ClothesNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleClothesNotFoundException(ClothesNotFoundException ex) {
        return constructErrorResponse(ex, HttpStatus.NOT_FOUND, "ClothesNotFoundException");
    }

    // 데이터 request 에러
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        String errorDetail = "요청 본문을 파싱할 수 없습니다. JSON 형식을 확인해주세요.";
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "HttpMessageNotReadableException", errorDetail);
    }
    // 기타 예외
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleAllUncaughtException(Exception e) {
        return constructErrorResponse(e,HttpStatus.INTERNAL_SERVER_ERROR, "handleAllUncaughtException");
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED) //404
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<?> dataNotFoundException(DataNotFoundException e) {
        log.error("[exceptionHandle] ex={}", e.getMessage());
        return ResponseUtil.buildErrorResponse(HttpStatus.NOT_FOUND,"DataNotFoundException",e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) //500
    @ExceptionHandler(DataMismatchException.class)
    public ErrorResponse datamismatchExHandle(DataMismatchException e) {
        return constructErrorResponse(e,HttpStatus.INTERNAL_SERVER_ERROR, "DataMismatchException");
    }

    private ErrorResponse constructErrorResponse(Exception e, HttpStatus status, String errorType) {
        log.error("[exceptionHandle] ex={}", e.getMessage(), e);
        return new ErrorResponse(status.value(), errorType, e.getMessage());
    }
}
