package com.smp.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smp.main.dto.CommentDTO;
import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.Comment;
import com.smp.main.model.User;
import com.smp.main.service.CommentService;
import com.smp.main.service.UserService;
 

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	CommentService commentService;
	@Autowired
	UserService userService;
	
	@GetMapping("post/{postId}")
	public ResponseEntity<List<Comment>> getCommentByPostId(@RequestParam("postId") String postId){
		List<Comment> comments=commentService.getCommentByPostId(postId);
		
		return  ResponseEntity.ok(comments);
	}
//	@GetMapping("reel/{reelId}")
//	public ResponseEntity<List<Comment>> getCommentByReelId(@RequestParam("reelId") String reelId){
//		List<Comment> comments=commentService.getCommentByPostId(reelId);
//		
//		return  ResponseEntity.ok(comments);
//	}
//	@GetMapping("/{cId}")
//	public ResponseEntity<List<Comment>> getComment(@RequestParam("cId") List<String> cId){
//		List<Comment> comments=commentService.getComments(cId);
//		
//		return  ResponseEntity.ok(comments);
//	}
	@GetMapping("/{cId}")
	public ResponseEntity<List<Comment>> getComment(@PathVariable List<String> cId){
		for(String param : cId) {
	        System.out.println("id: " + param);
	     }
		List<Comment> comments=commentService.getComments(cId);
		
		return  ResponseEntity.ok(comments);
	}
	@PostMapping("/addComment")
	public ResponseEntity<Comment> createComment(@RequestHeader("Authorization") String jwt,@RequestBody CommentDTO request) {
		// Extract content, userId, postId from request
		User user=userService.getUserByToken(jwt);
    	
    	if(user==null) {throw new UserNotExists("No user with token:"+jwt);}
		String content = request.getContent();
        Long userId = user.getId();
        String postId = request.getPostId();

        // Call service method to create comment
        Comment comment = commentService.createPostComment(content, userId, postId);
        System.out.print(comment.getContent());
        // Return ResponseEntity with created comment
        return ResponseEntity.ok(comment);
	}
	@PostMapping("/addReelComment")
	public ResponseEntity<Comment> createReelComment(@RequestHeader("Authorization") String jwt,@RequestBody CommentDTO request) {
		// Extract content, userId, postId from request
		User user=userService.getUserByToken(jwt);
    	
    	if(user==null) {throw new UserNotExists("No user with token:"+jwt);}
		String content = request.getContent();
        Long userId = user.getId();
        String reelId = request.getPostId();

        // Call service method to create comment
        Comment comment = commentService.createReelComment(content, userId, reelId);
        System.out.print(comment.getContent());
        // Return ResponseEntity with created comment
        return ResponseEntity.ok(comment);
	}
	@PutMapping("/likeComment")
	public ResponseEntity<Comment> likeComment(@RequestHeader("Authorization") String jwt,@RequestParam("commentId") String commentId ) {
		User user=userService.getUserByToken(jwt);
		Comment comment= commentService.likeComment(commentId, user.getId());
		System.out.println(comment.getLikes());
		return  ResponseEntity.ok(comment);
	}
	@PutMapping("/unlikeComment")
	public ResponseEntity<Comment> unlikeComment(@RequestHeader("Authorization") String jwt,@RequestParam("commentId") String commentId ) {
		User user=userService.getUserByToken(jwt);
		Comment comment= commentService.unlikeComment(commentId, user.getId());
		System.out.println(comment.getLikes());
		return  ResponseEntity.ok(comment);
	}
	@DeleteMapping("/deleteComment")
	public String deleteComment(@RequestHeader("Authorization") String jwt,@RequestParam String commentID) {
		User user=userService.getUserByToken(jwt);
		 return commentService.deleteComment(commentID,user);
	}
}
