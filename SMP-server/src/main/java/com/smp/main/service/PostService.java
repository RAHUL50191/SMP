package com.smp.main.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
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
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) {
        throw new UserNotExists("User not found with ID: " + userId);
    }

    post.setUser(user);
    List<Long> likes = new ArrayList<>();
    List<Comment> comments = new ArrayList<>();
//    List<String> comments = new ArrayList<>();
    post.setLikes(likes);
    post.setComments(comments);
//    updatedUser.setSaved(saved);
    post.setDate( LocalDateTime.now());

    // Save the post
    post = postRepository.insert(post);
    return post.getId();
}
	//get
	public Post getPost(String id) {
		Post post =postRepository.findById(id).orElse(null);
		if(post==null) {
			throw new PostNotExists("No Post available with "+id+" id");
		}
		
		User u=post.getUser();
		if(u==null) {
			throw new UserNotExists("User not found");
		}
		return post;
	}
 
	//get all post by user
    public List<Post> getAllPostsByUserId(Long userId) {
    	System.out.println(userId);
        return postRepository.findByUserId(userId);
    }
    
    public List<Post> getAllPostsByUser(Long userId) {
    	System.out.println(userId);
    	User user=userRepository.findById(userId).orElseThrow(()->new UserNotExists("User not found"+userId));
    	
        List<Post> p=postRepository.findByUser(user);
        return  p;
    }
	public List<Post> getAllPosts() {
		// TODO Auto-generated method stub
		List<Post> posts=postRepository.findAll();
		return posts;
	}
	//comment liked by users
	public Post likePost(String postID,Long userID) {
			Post post=postRepository.findById(postID).orElse(null);
 
			if(post!=null) {
					if(!post.getLikes().contains(userID)) {
					 post.getLikes().add(userID);
					}
					return postRepository.save(post);
			}else {
				throw new PostNotExists("post not found");
			}
			
			
		}
	//post unliked by users
	public Post unlikePost(String postID,Long userID) {
			Post post=postRepository.findById(postID).orElse(null);
	 
			if(post!=null) {
					if(post.getLikes().contains(userID)) {
					 post.getLikes().remove(userID);
					}
					return postRepository.save(post);
			}else {
				throw new PostNotExists("post not found");
			}
			
			
		}
	//delete post
	public String deletePost(String postID) {
			Post post=postRepository.findById(postID).orElse(null);
			if(post!=null) {
				postRepository.deleteById(postID);
				return "Successfully deleted";
			}
			else {
				throw new PostNotExists("post not found");
			}
			
		}

}