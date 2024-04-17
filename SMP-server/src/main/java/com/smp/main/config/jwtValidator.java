package com.smp.main.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.smp.main.exceptions.InvalidToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class jwtValidator extends OncePerRequestFilter {
	
	@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
    try {
        String jwt = request.getHeader(jwtConstant.JWT_HEADER);
        if (jwt != null) {
            String email = jwtProvider.getEmailFromJwtToken(jwt);
            List<GrantedAuthority> authorities = new ArrayList<>();
            Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    } catch (Exception e) {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write("Invalid token");
        response.getWriter().flush();
        return;
    }
}


}
