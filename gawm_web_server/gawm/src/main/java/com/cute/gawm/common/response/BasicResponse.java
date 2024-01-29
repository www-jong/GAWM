package com.cute.gawm.common.response;

public class BasicResponse {
    private int status;
    private Object data;

    public BasicResponse(int status, Object data) {
        this.status = status;
        this.data = data;
    }

    // Getter와 Setter
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}