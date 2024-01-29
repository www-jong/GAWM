package com.cute.gawm.common.response;

import java.util.List;

public class PagingResponse {
    private int status;
    private List<?> content;
    private boolean isFirst;
    private boolean isLast;
    private int page;
    private int totalPage;
    private int size;
    private boolean sorted;
    private boolean asc;
    private boolean filtered;

    public PagingResponse(int status, List<?> content, boolean isFirst, boolean isLast, int page, int totalPage, int size, boolean sorted, boolean asc, boolean filtered) {
        this.status = status;
        this.content = content;
        this.isFirst = isFirst;
        this.isLast = isLast;
        this.page = page;
        this.totalPage = totalPage;
        this.size = size;
        this.sorted = sorted;
        this.asc = asc;
        this.filtered = filtered;
    }

    // Getter와 Setter
    // ... (생략)
}