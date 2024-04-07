package com.smp.main.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.User;
import com.smp.main.repository.UserRepository;

@Service
public class CustomUserDetails implements UserDetailsService{
	@Autowired
	private UserRepository userRepository;
	private Collection<? extends GrantedAuthority> authorities;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user=userRepository.findByEmail(username);
		if(user==null) {
			
			
			throw new UserNotExists("User not found");
		}
		List<GrantedAuthority> authorities=new ArrayList<>();
				
		return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
	}

}
