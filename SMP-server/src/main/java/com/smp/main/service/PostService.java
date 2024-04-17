package com.smp.main.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;  
import org.springframework.web.multipart.MultipartFile;

import com.smp.main.exceptions.PostNotExists;
import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.Comment;
import com.smp.main.model.Post;
import com.smp.main.model.User;
import com.smp.main.repository.PostRepository;
import com.smp.main.repository.UserRepository;

@Service
public class PostService {
@Autowired
PostRepository postRepository;
@Autowired
UserRepository userRepository;
//add
	public String addPost(String title, MultipartFile file, Long userId) throws IOException {
    
	    Post post = new Post();
	    post.setTitle(title);
	    post.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
	
	    //find user if exists
	    User user=userRepository.findById(userId).orElseThrow(()->new UserNotExists("User not found with ID: " + userId));
	    post.setUser(user);
	    List<Long> likes = new ArrayList<>();
	    List<String> comments = new ArrayList<>(); 
	    post.setLikes(likes);
	    post.setComments(comments); 
	    post.setDate( LocalDateTime.now());
	
	    // Save the post
	    post = postRepository.insert(post);
	    return post.getId();
	}
//get
	public Post getPost(String id) {
		Post post =postRepository.findById(id).orElseThrow(()->new PostNotExists("No Post available with "+id+" id"));
		userRepository.findById( post.getUser().getId()).orElseThrow(()-> new UserNotExists("User not found"));
		 
		return post;
	}
 
//get all post by user
    public List<Post> getAllPostsByUserId(Long userId) { 
        return postRepository.findByUser(userId);
    }
    public List<Post> getAllPostsByUser(Long userId) { 

    	userRepository.findById(userId).orElseThrow(()->new UserNotExists("User not found"+userId));
    	
        List<Post> p=postRepository.findByUser(userId);
        return  p;
    }
//post by follwing user	
  	public Set<Post> getAllPostsByFollowing(List<Long> list) {
  		Set<Post> posts =new HashSet<>();
  		for(Long Id:list) {
  			User user=userRepository.findById(Id).orElse(null);
  			if(user==null)continue;
  			List<Post> postByFollowing=getAllPostsByUserId(Id);
  			 for(Post p:postByFollowing) {
  				 posts.add(p);
  			 }
  		}
  		return posts;
  	}
//all
	public List<Post> getAllPosts() {
		// TODO Auto-generated method stub
		List<Post> posts=postRepository.findAll();
		return posts;
	}
//like
	public Post likePost(String postID,Long userID) {
		Post post=postRepository.findById(postID).orElseThrow(()->new PostNotExists("post not found"));	 
		if(!post.getLikes().contains(userID)) {
			post.getLikes().add(userID);
		}
		return postRepository.save(post);
	} 
	public Post unlikePost(String postID,Long userID) {
		Post post=postRepository.findById(postID).orElseThrow(()->new PostNotExists("post not found"));	 
 
		if(post.getLikes().contains(userID)) {
		 post.getLikes().remove(userID);
		}
		return postRepository.save(post);
		 			
	}
//save
	public User savePost(User user, String postId) { 
		 if (!user.getSaved().contains(postId)) {
		        user.getSaved().add(postId); // Adding postId to the list of saved posts  
		 }
		 return userRepository.save(user);
	}
	public User unsavePost(User user, String postId) {
		 if(user.getSaved().contains(postId)) {
		        user.getSaved().remove(postId); // Adding postId to the list of saved posts
		 }
		 return userRepository.save(user);	
	}
	//delete post
	public String deletePost(String postID) {
		postRepository.findById(postID).orElseThrow(()->new PostNotExists("post not found")); 
		postRepository.deleteById(postID);
		return "Successfully deleted";
		 
			
		}



}