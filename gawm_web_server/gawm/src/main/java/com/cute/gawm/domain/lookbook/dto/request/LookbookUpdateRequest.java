package com.cute.gawm.domain.lookbook.dto.request;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
@Getter
@Builder
public class LookbookUpdateRequest {
    private List<String> lookbooksImg;
    private List<Integer> clothes;
    private List<Integer> tags;
}
