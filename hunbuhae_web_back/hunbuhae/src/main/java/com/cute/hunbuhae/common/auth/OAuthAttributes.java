package com.cute.hunbuhae.common.auth;

import com.cute.hunbuhae.domain.user.entity.Role;
import com.cute.hunbuhae.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Getter
@Builder
@RequiredArgsConstructor
@Slf4j
public class OAuthAttributes {

    private final Map<String, Object> attributes;
    private final String nameAttributeKey;
    private final String name;
    private final String email;
    private final User.Gender gender;
    private final Integer age;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if("naver".equals(registrationId)) {
            return ofNaver(userNameAttributeName, attributes);
        }
        else if("kakao".equals(registrationId)) {
            return ofKakao("id",attributes);
        }
        else {
            return ofGoogle(userNameAttributeName, attributes);
        }
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");

        return OAuthAttributes.builder()
                .name(UUID.randomUUID().toString())
                .email((String) kakaoAccount.get("email"))
                .gender(kakaoAccount.get("gender").equals("female")? User.Gender.FEMALE: User.Gender.MALE)
                .age(LocalDate.now().getYear()-Integer.parseInt(kakaoAccount.get("birthyear").toString())+1)
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {

        return OAuthAttributes.builder()
                .name(UUID.randomUUID().toString())
                .email((String) attributes.get("email"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }


    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .name((String) response.get("name"))
//                .gender((String) response.get("gender"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .name(name)
                .email(email)
                .gender(gender)
                .age(age)
                .role(Role.GUEST)
                .build();
    }
}
