package com.cute.gawm.common.auth;

import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.user.dto.SessionUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RevokeController {

    private final RevokeService revokeService;

    @DeleteMapping("/user/google")
    public ResponseEntity<?> revokeGoogleAccount(@LoginUser SessionUser sessionUser, @RegisteredOAuth2AuthorizedClient("google") OAuth2AuthorizedClient oAuth2AuthorizedClient) {
        log.info("revokeGoogleAccount들어옴");
        revokeService.deleteGoogleAccount(sessionUser.getId(),oAuth2AuthorizedClient);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, null);
    }

    @DeleteMapping("/user/kakao")
    public ResponseEntity<?> revokeKakaoAccount(@LoginUser SessionUser sessionUser, @RegisteredOAuth2AuthorizedClient("kakao") OAuth2AuthorizedClient oAuth2AuthorizedClient) {
        revokeService.deleteKakaoAccount(sessionUser.getId(),oAuth2AuthorizedClient);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, null);
    }

}
