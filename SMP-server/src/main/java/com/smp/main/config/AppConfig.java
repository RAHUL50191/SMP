package com.smp.main.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class AppConfig {
	@Bean
	SecurityFilterChain SecurityFilterChain(HttpSecurity http)throws Exception {
		
		http.authorizeHttpRequests(authorize -> authorize
				.requestMatchers("/signin","/singup").permitAll()
//                .anyRequest().authenticated()
                .anyRequest().permitAll()
				)
			.addFilterBefore(new jwtValidator(), BasicAuthenticationFilter.class)
            .csrf(csrf -> csrf.disable());
       
//		http.authorizeHttpRequests(Authorize->Authorize.requestMatchers("/api/**").authenticated().anyRequest().permitAll()).csrf(csrf->csrf.disable());
		return http.build();
	}
	 @Bean
	 PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	 }
	   @Bean
	    WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**")
	                        .allowedOrigins("http://localhost:3000")
	                        .allowedMethods("GET", "POST", "PUT", "DELETE")
	                        .allowedHeaders("*");
	            }
	        };
	    }
	 

}
