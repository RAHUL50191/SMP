package com.smp.main.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smp.main.config.AuthResponse;
import com.smp.main.config.jwtProvider;
import com.smp.main.dto.LoginRequest;
import com.smp.main.exceptions.InvalidPassword;
import com.smp.main.exceptions.InvalidUser;
import com.smp.main.exceptions.UserAlreadyExists;
import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.User;
import com.smp.main.repository.UserRepository;
import com.smp.main.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
public class AuthController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserDetailsService userDetailsService;
	@PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User newUser) {
        User savedUser ;
        
        // Check if the user already exists
//	    User existingUserId = userRepository.findById(newUser.getId()).orElse(null);
	    User existingUserName = userRepository.findByName(newUser.getName());
	    User existingUserEmail = userRepository.findByEmail(newUser.getEmail());
	    User existingUserId = userRepository.findById(newUser.getId()).orElse(null); 
	    
	    if (  existingUserName == null && existingUserEmail == null && existingUserId ==null) {
	        // Initialize following and followers lists
	        newUser.setPassword(passwordEncoder.encode( newUser.getPassword()));
	    	List<Long> following = newUser.getFollowing() != null ? newUser.getFollowing() : new ArrayList<>();
	        List<Long> followers = newUser.getFollowers() != null ? newUser.getFollowers() : new ArrayList<>();
	        List<String> saved = newUser.getSaved() != null ? newUser.getSaved() : new ArrayList<>();
	        LocalDateTime date = LocalDateTime.now();
	        // Set the initialized lists
	        newUser.setFollowing(following);
	        newUser.setFollowers(followers);
	        newUser.setSaved(saved);
	        newUser.setDate(date);
	        // Insert the new user
	        savedUser= userRepository.insert(newUser);
	    } else {
	        throw new UserAlreadyExists("User already exists");
	    }
        System.out.println(savedUser.getEmail());
        
        
        Authentication authentication= new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        String token=jwtProvider.generateToken(authentication);
        AuthResponse res=new AuthResponse(token,"Register Success");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
	@PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginReq) {
		
	    User user = userRepository.findByEmail(loginReq.getEmail());
	    if(user ==null) {
	    	throw new UserNotExists("no user found");
	    }Authentication authentication;
//	    try {
	    	authentication= authenticate(loginReq.getEmail(), loginReq.getPassword());
//        }
//	    catch (BadCredentialsException e) {
//	        throw new BadCredentialsException("Invalid credentials: " + e.getMessage());
//	    }
        String token=jwtProvider.generateToken(authentication);
        AuthResponse res=new AuthResponse(token,"Login Success");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
       
	    }
	private Authentication authenticate(String email,String password) {
		UserDetails userDetails=userDetailsService.loadUserByUsername(email);
		if(userDetails==null) {
			throw new InvalidUser("Invalid userName");
			
		}
		System.out.println(password+" "+passwordEncoder.encode(password)+" "+userDetails.getPassword()+""+passwordEncoder.matches(password, userDetails.getPassword()));
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			
			throw new InvalidPassword("Invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
	}
}
