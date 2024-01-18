package com.cute.hunbuhae.domain.user.auth;

import com.cute.hunbuhae.domain.user.entity.Role;
import com.cute.hunbuhae.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import java.util.Map;

@Getter
@Builder
@RequiredArgsConstructor
@Slf4j
public class OAuthAttributes {

    private final Map<String, Object> attributes;
    private final String nameAttributeKey;
    private final String name;
    private final String gender;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if("naver".equals(registrationId)) {
            return ofNaver(userNameAttributeName, attributes);
        }
        else {
            log.error("naver가 아님");
            return ofNaver(userNameAttributeName, attributes);
        }
    }


    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        log.info("response={}",response);
        log.info("userNameAttributeName={}",userNameAttributeName);

        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .gender((String) response.get("gender"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .name(name)
                .role(Role.GUEST)
                .build();
    }
}
