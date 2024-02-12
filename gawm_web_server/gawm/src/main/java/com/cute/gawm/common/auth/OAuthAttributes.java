package com.cute.gawm.common.auth;


import com.cute.gawm.domain.user.entity.Role;
import com.cute.gawm.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;


import java.time.LocalDate;
import java.util.Map;

@Getter
@Builder
@RequiredArgsConstructor
@Slf4j
public class OAuthAttributes {

    private final Map<String, Object> attributes;
    private final String nameAttributeKey;
    private final String email;
    private final Integer age;
    private final User.Gender gender;
    private final String nickname;
    private final Integer point;
    private final Integer level;
    private final User.Provider provider;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {

        if("kakao".equals(registrationId)) {
            return ofKakao("id",attributes);
        }
        else {
            return ofGoogle(userNameAttributeName, attributes);
        }
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
        System.out.println("!!!!!!!!!!");
        return OAuthAttributes.builder()
                .email((String) kakaoAccount.get("email"))
                .gender(kakaoAccount.get("gender").equals("female")? User.Gender.FEMALE: User.Gender.MALE)
                .age(calculateAge(Integer.parseInt(kakaoAccount.get("birthyear").toString())))
                .provider(User.Provider.KAKAO)
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();

    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {

        return OAuthAttributes.builder()
                .email((String) attributes.get("email"))
                .gender(User.Gender.NONE)
                .age(0)
                .provider(User.Provider.GOOGLE)
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }

    public User toEntity(String nickname) {
        return User.builder()
                .nickname(nickname)
                .email(email)
                .gender(gender)
                .age(age)
                .point(0)
                .level(1)
                .role(Role.GUEST)
                .provider(provider)
                .build();
    }

    public static int calculateAge(int birthYear) {
        LocalDate currentDate = LocalDate.now(); // 현재 날짜
        int currentYear = currentDate.getYear(); // 현재 년도
        return currentYear - birthYear; //만 나이
    }
}
