package com.smp.main.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "chat")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Chat {
	@Id 
	private String id;
	private String content;
	private List<Long> likes; 
	private Long userId;
	private String postId;
	private LocalDateTime createdAt;
 

	
}