package com.cute.gawm.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class BasicResponse {
    private int status;
    private Object data;
}
