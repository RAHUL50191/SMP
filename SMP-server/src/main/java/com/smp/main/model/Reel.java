package com.smp.main.model;
import java.time.LocalDateTime; 
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter
@NoArgsConstructor
@Document(collection="Reels")
public class Reel {
	@Id
	private String id;
	private String title;
	private String vidObj;

	@DBRef
	private User user;
	private List<Long> likes;
	@DBRef
	private List<Comment> comments;
	private LocalDateTime date;
}
