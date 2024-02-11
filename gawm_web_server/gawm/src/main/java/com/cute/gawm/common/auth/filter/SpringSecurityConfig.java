package com.cute.gawm.common.auth.filter;

import com.cute.gawm.common.auth.OAuthService;
import com.cute.gawm.domain.user.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {
    private final OAuthService oAuthService;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;
    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/css/**", "/images/**", "/js/**", "/profile","/back/oauth2/authorization/**","/back/healthcheck/**","/back/login/**", "**").permitAll()
                .antMatchers("/api/**").hasRole(Role.USER.name())
                .anyRequest().authenticated().and()
                .logout().logoutUrl("/back/user/logout").logoutSuccessUrl("/").and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/back/oauth2/authorization")
                .and()
                .userInfoEndpoint()
                .userService(oAuthService)
                .and()
                .successHandler(customLoginSuccessHandler)
                .and()
                .exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint);

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://i10e203.p.ssafy.io/gawm/","http://localhost:4000/gawm/", "http://localhost:3000", "http://localhost:4000", "http://localhost:3000/gawm/live")); // 프론트엔드 도메인 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "access_token","SESSION","Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true); // 중요: 쿠키를 포함시키기 위해 true로 설정
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
