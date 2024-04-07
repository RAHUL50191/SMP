package com.smp.main.config;

//import java.sql.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims; 
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.Date;

@Component
public class jwtProvider {

 // Replace with your own secret key
    private static final int TOKEN_VALIDITY = 8600 * 5; // Token validity in seconds (5 hours)
	private static final SecretKey key=Keys.hmacShaKeyFor(jwtConstant.SECRET_KEY.getBytes());
	public static String generateToken(Authentication auth) {
		String jwt=Jwts.builder()
				.setIssuer("SocialMediaPlatform")
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+8640000))
				.claim("email",auth.getName())
				.signWith(key)
				.compact();
		return jwt;
	}
//    public static String generateToken(Authentication auth) {
//        Map<String, Object> claims = new HashMap<>();
//        return createToken(claims,auth.getName());
//    }

    private static String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuer("SocialMediaPlatform")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
                .signWith(key)
                .compact();
    }
    public static String getEmailFromJwtToken(String jwt) {
    	//bearer token	
    	jwt= jwt.substring(7);
    	Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody(); 
    	String email=String.valueOf(claims.get("email"));
    	return email;
    }
    
    
    
    
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired(String token) {
        final java.util.Date expiration = extractExpiration(token);
        return expiration.before(new Date(System.currentTimeMillis()));
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(jwtConstant.SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private java.util.Date extractExpiration(String token) {
        return  extractClaim(token, Claims::getExpiration);
    }

    private String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
}
