package com.smp.main.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.smp.main.model.Post;
import com.smp.main.model.User;

public interface PostRepository extends MongoRepository<Post, String>{

	List<Post> findByUser_Id(Long id);
//	List<Post> findByEmailPosts(String email);
	List<Post> findByUserId(Long userId);
	List<Post> findByUserId(User user);
	List<Post> findByUserEmail(String s);
	List<Post> findByUser(User user);
}
 