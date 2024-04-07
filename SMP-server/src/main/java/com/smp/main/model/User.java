package com.smp.main.model;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "smp")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
	
	@Id
 
	private Long id;
	@Field("userName")
	private String name;
	private String password;
	private String email;
	private List<Long> following;
	private List<Long> followers;
	private List<String> saved;
	private LocalDateTime date;
}
