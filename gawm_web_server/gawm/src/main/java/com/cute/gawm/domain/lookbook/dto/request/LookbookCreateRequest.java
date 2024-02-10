package com.cute.gawm.domain.lookbook.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class LookbookCreateRequest {
    private boolean isPublic;
    private List<Integer> clothes;
    private List<String> tags;
}


