package com.smp.main.model;


import java.time.LocalDateTime;
import java.util.List;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="post")
public class Post {
	@Id
    private String id;
    private String title;
    private Binary image; 
    @DBRef
	private User user;
    private List<Long> likes; 
    private List<String> comments;
    private LocalDateTime date;
}
