package com.cute.gawm.common.auth.filter;

import org.springframework.security.core.Authentication;
        import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
        import javax.servlet.FilterChain;
        import javax.servlet.ServletException;
        import javax.servlet.http.Cookie;
        import javax.servlet.http.HttpServletRequest;
        import javax.servlet.http.HttpServletResponse;
        import java.io.IOException;
@Component
public class SessionCookieFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Spring Security에서 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
//            SecurityContextHolder.getContext().setAuthentication();
            Cookie[] cookies = request.getCookies();
            System.out.println(cookies.toString());
        }
        if (authentication != null) {
            // 세션 값 가져오기
            String sessionValue = authentication.getName(); // 예시: 사용자 이름을 세션 값으로 사용
            // 세션 값을 쿠키로 전달
            Cookie sessionCookie = new Cookie("SESSION", sessionValue);
            sessionCookie.setPath("/");
            System.err.println(sessionValue);
            response.addCookie(sessionCookie);
        }

        filterChain.doFilter(request, response);
    }
}
