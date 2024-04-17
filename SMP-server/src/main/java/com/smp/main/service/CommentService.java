package com.smp.main.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smp.main.exceptions.CommentNotExists;
import com.smp.main.exceptions.PostNotExists;
import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.Comment;
import com.smp.main.model.Post;
import com.smp.main.model.Reel;
import com.smp.main.model.User;
import com.smp.main.repository.CommentRepository;
import com.smp.main.repository.PostRepository;
import com.smp.main.repository.ReelRepository;
import com.smp.main.repository.UserRepository;
@Service
public class CommentService {
	
	@Autowired
	CommentRepository commentRepository;
	
	@Autowired
	UserRepository userRepository;
	@Autowired 
	PostRepository postRepository;
	@Autowired 
	ReelRepository reelRepository;
	public Comment createPostComment(String content,Long userId,String postId) {
	
		User user= userRepository.findById(userId).orElse(null);
		Post post=postRepository.findById(postId).orElse(null);
		if(user!=null && post!=null) {
			Comment comment=commentRepository.save(new Comment(content,new ArrayList<>(),userId,postId,user.getName(),LocalDateTime.now()));
			post.getComments().add(comment.getId());
			postRepository.save(post);
			return comment;
		}
		else {
			if(user==null)
			throw new UserNotExists("User not found.");
			else
				throw new PostNotExists("Post not found");
		}
	}
	

	public Comment createReelComment(String content, Long userId, String reelId) {

		User user= userRepository.findById(userId).orElse(null);
		Reel reel=reelRepository.findById(reelId).orElse(null);
		if(user!=null && reel!=null) {
			Comment comment=commentRepository.save(new Comment(content,new ArrayList<>(),userId,reelId,user.getName(),LocalDateTime.now()));
			reel.getComments().add(comment.getId());
			reelRepository.save(reel);
			return comment;
		}
		else {
			if(user==null)
			throw new UserNotExists("User not found.");
			else
				throw new PostNotExists("Post not found");
		} 
	}
	//comment liked by users
	public Comment likeComment(String commentID,Long userID) {
		Comment comment=commentRepository.findById(commentID).orElse(null);
//		System.out.println();
		if(comment!=null) {
				if(!comment.getLikes().contains(userID)) {
				 comment.getLikes().add(userID);
				}
				return commentRepository.save(comment);
		}else {
			throw new CommentNotExists("Comment not found");
		}
		
		
	}
	//comment unliked by users
	public Comment unlikeComment(String commentID,Long userID) {
		Comment comment=commentRepository.findById(commentID).orElse(null);
 
		if(comment!=null) {
				if(comment.getLikes().contains(userID)) {
				 comment.getLikes().remove(userID);
				}
				return commentRepository.save(comment);
		}else {
			throw new CommentNotExists("Comment not found");
		}
		
		
	}
	//delete comment
	public String deleteComment(String commentID, User user) {
		Comment comment=commentRepository.findById(commentID).orElse(null);
		if(comment!=null && user!=null && user.getId()==comment.getUserId()) {
			commentRepository.deleteById(commentID);
			return "Successfully deleted";
		}
		else {
			throw new CommentNotExists("Comment not found with this user");
		}
		
	}
	public List<Comment> getCommentByPostId(String postId) {
		List<Comment> comments= commentRepository.findByPostId(postId);
		return comments;
	}


	public List<Comment> getComments(List<String> cId) { 
		return commentRepository.findAllById(cId);
	}

}
