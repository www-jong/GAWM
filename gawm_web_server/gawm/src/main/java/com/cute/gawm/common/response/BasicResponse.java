package com.cute.gawm.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
public class BasicResponse {
    private final int status;
    private final Object data;

    public static ResponseEntity<?> buildErrorResponse(HttpStatus httpStatus, String errorName, String errorMessage) {
        ErrorResponse errorResponse = new ErrorResponse(httpStatus.value(), errorName, errorMessage);
        return new ResponseEntity<>(errorResponse, httpStatus);
    }
}
