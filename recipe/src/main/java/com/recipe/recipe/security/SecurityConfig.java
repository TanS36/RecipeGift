package com.recipe.recipe.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF protection
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()  // Public routes for authentication
                        .requestMatchers("/api/foods/**").permitAll()  // Public route for food endpoints
                        .anyRequest().authenticated()  // Protect all other requests
                )
                .oauth2Login(oauth2 -> oauth2 // OAuth2 login setup
                        .loginPage("/login")  // Customize login page if needed
                        .defaultSuccessUrl("/home", true) // Redirect after successful login
                        .failureUrl("/login?error=true")  // Customize failure URL if needed
                )
                .cors();  // Enable CORS globally using the configuration defined in CorsConfigurationSource bean



        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");  // Adjust to the frontend URL
        configuration.addAllowedMethod("*");  // Allow all HTTP methods
        configuration.addAllowedHeader("*");  // Allow all headers
        configuration.setAllowCredentials(true);  // Allow credentials (cookies, etc.)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // Apply this configuration to all routes
        return source;
    }
}
