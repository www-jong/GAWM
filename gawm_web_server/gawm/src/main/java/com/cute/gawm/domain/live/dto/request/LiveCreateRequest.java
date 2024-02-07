package com.cute.gawm.domain.live.dto.request;

import com.cute.gawm.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
@Getter
@Builder
public class LiveCreateRequest {
    private String name;
}
