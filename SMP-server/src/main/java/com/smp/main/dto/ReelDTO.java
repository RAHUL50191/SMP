package com.smp.main.dto;
import java.time.LocalDateTime; 
import java.util.List;

import com.smp.main.model.Comment;
import com.smp.main.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter  
@Setter
@NoArgsConstructor 
@AllArgsConstructor
public class ReelDTO {
	 
	private String id;
	private String title;
	private String vidContent;

	 
	private User user;
	private List<Long> likes;
 
	private List<Comment> comments;
	private LocalDateTime date;
}
