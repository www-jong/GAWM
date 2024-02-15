package com.cute.gawm.domain.live.dto.request;

import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LiveCreateRequest {
    private String name;
    private Integer point;
    private boolean isPublic;
}
