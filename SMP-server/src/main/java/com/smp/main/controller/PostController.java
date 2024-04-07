 package com.smp.main.controller;
 
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam; 
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smp.main.exceptions.PostNotExists;
import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.Comment;
import com.smp.main.model.Post;
import com.smp.main.model.User; 
import com.smp.main.repository.UserRepository;
import com.smp.main.service.PostService;
import com.smp.main.service.UserService;   

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
@RequestMapping("/post")
public class PostController{
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserService userService;
	@Autowired
	PostService postService;
	//get post by post id
	@GetMapping("{id}")
	public ResponseEntity<Post> getPost(@PathVariable("id") String postId) {
		Post post=postService.getPost(postId);
		return new ResponseEntity<>(post,HttpStatus.CREATED) ;
	}
	//get user by postid
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getPostUser(@PathVariable("id") String postId) {
		Post post=postService.getPost(postId);
		
		return new ResponseEntity<>(post.getUser(),HttpStatus.OK);
		}
	//find post by user id
	@GetMapping("/postsByUser")
	public List<Post> getAllPostsByUserId(@RequestHeader("Authorization") String jwt) {
		User user=userService.getUserByToken(jwt);
    	if(user==null) {
    		throw new BadCredentialsException("invalid access token");
    	}
		return postService.getAllPostsByUser(user.getId());
    }
	@GetMapping("/postsByUsers/{id}")
	public List<Post> getAllPostsByUserId(@RequestParam("id") Long id) {
		User user=userService.getUser(id);
    	if(user==null) {
    		throw new BadCredentialsException("invalid access token");
    	}
		return postService.getAllPostsByUser(user.getId());
    }
	@GetMapping("/postsByUserFollowing")
	public List<Post> getAllPostsByUserFollowing(@RequestHeader("Authorization") String jwt) {
		User user=userService.getUserByToken(jwt);
    	if(user==null) {
    		throw new BadCredentialsException("invalid access token");
    	}
    	  List<Long> followingIds = user.getFollowing(); // Assuming user.getFollowing() returns the list of user IDs being followed

    	    List<Post> postsByFollowing = new ArrayList<>();
    	    for (Long followingId : followingIds) {
    	        try {
    	            List<Post> posts = postService.getAllPostsByUser(followingId);
    	            postsByFollowing.addAll(posts);
    	        } catch (UserNotExists e) {
    	            // Handle the case where the user does not exist
    	            // You may choose to log the error or perform other error handling
    	            e.printStackTrace();
    	        }
    	    }
    	    
    	    return postsByFollowing;
    }
	 //find all
	@GetMapping("/all")
	public ResponseEntity<List<Post>> getAllPosts(){
		List<Post> posts=postService.getAllPosts();
		return ResponseEntity.ok(posts);
	}
	 
 
	//add post to db
	@PostMapping("/addPost")
	 public ResponseEntity<String> addPost(
	            @RequestParam("title") String title,
	            @RequestParam("image") MultipartFile file,
	            @RequestHeader("Authorization") String jwt
	    ) {
	        try {
	        	User user=userService.getUserByToken(jwt);
	        	if(user==null) {
	        		throw new BadCredentialsException("invalid access token");
	        	}
	            String postId = postService.addPost(title, file, user.getId());
	            return ResponseEntity.status(HttpStatus.CREATED).body("Post added successfully with ID: " + postId);
	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add post: " + e.getMessage());
	        }
	    }

	//like
	@PutMapping("/likePost")
	public ResponseEntity<Post> likePost(@RequestHeader("Authorization") String jwt,@RequestParam("postId") String postId ) {
		User user=userService.getUserByToken(jwt);
    	if(user==null) {
    		throw new BadCredentialsException("invalid access token");
    	}
		System.out.print(user.getId()+" "+postId);
		Post post= postService.likePost(postId, user.getId());
		System.out.println(post.getLikes());
		return  ResponseEntity.ok(post);
	}
	@PutMapping("/unlikePost")
	public ResponseEntity<Post> unlikePost(@RequestHeader("Authorization") String jwt,@RequestParam("postId") String postId ) {
		User user=userService.getUserByToken(jwt);
    	if(user==null) {
    		throw new BadCredentialsException("invalid access token");
    	}
		System.out.print(user.getId()+" "+postId);
		Post post= postService.unlikePost(postId, user.getId());
		System.out.println(post.getLikes());
		return  ResponseEntity.ok(post);
	}
	//delete
	@DeleteMapping("/deletePost")
	public String deletePost(@RequestParam("postId") String postID) {
		 return postService.deletePost(postID);
	}
	
	
	
	
	
}