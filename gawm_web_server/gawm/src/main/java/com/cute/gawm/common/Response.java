package com.cute.gawm.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Response {
    private final int status;
    private final Object data;
}
