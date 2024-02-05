package com.cute.gawm.domain.user.dto;

import com.cute.gawm.domain.user.entity.User;
import lombok.Data;

@Data
public class UserSummaryInfoDto {

    private int userId;
    private String profile_img;
    private String nickname;
    private int level;
    private int lookbook_num;
    private int following_num;
    private int follower_num;
    private boolean isFollowing;

    public UserSummaryInfoDto(User user, int lookbook_num, int following_num, int follower_num, boolean isFollowing) {
        this.userId = user.getUserId();
        this.profile_img = user.getProfileImg();
        this.nickname = user.getNickname();
        this.level = user.getLevel();
        this.lookbook_num = lookbook_num;
        this.following_num = following_num;
        this.follower_num = follower_num;
        this.isFollowing = isFollowing;
    }
}
