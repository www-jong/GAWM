package com.cute.gawm.domain.lookbook.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
public class LookbookCreateRequest {
    private Boolean isPublic;
    private List<Integer> clothes;
    private List<String> tags;

}


