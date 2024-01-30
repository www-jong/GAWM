package com.cute.gawm.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class ErrorResponse {
    private final int status;
    private final String name;
    private final String message;

}
