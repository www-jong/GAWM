package com.cute.gawm.domain.tag.dto.response;

import com.cute.gawm.domain.tag.entity.Tag;
import lombok.Data;

@Data
public class TagResponse {
    private String name;

    public TagResponse(Tag tag) {
        this.name = tag.getName();
    }
}
