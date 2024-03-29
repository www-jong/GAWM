package com.cute.gawm.domain.live.dto.response;

import com.cute.gawm.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor @NoArgsConstructor
public class LiveMiniResponse {
    private int liveId;
    private int userId;
    private String nickname;
    private String profileImg;
    private String name;
    private String session;
    private int point;
    private Timestamp createdAt;
    private Boolean isPublic;
}
