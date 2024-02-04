package com.cute.gawm.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class PagingResponse {
    private int status;
    private List<?> content;
    private boolean isFirst;
    private boolean isLast;
    private int page;
    private int totalPage;
    private int size;
    private boolean sorted = false;
    private boolean asc = false;
    private boolean filtered = false;
}