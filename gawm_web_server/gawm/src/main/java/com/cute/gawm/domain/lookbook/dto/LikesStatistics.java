package com.cute.gawm.domain.lookbook.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LikesStatistics {

    private int likesCount;
    private int postId;
}
