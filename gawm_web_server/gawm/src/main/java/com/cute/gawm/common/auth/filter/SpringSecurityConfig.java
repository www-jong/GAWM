
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

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {
    private final OAuthService oAuthService;
    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/css/**", "/images/**", "/js/**", "/profile").permitAll()
                .antMatchers("/api/**").hasRole(Role.USER.name())
                .anyRequest().authenticated().and()
                .logout().logoutSuccessUrl("/").and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(oAuthService)
                .and()
                .and()
                .exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint);

        return http.build();
    }
}
