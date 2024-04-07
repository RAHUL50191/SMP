package com.smp.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smp.main.dto.CommentDTO;
import com.smp.main.model.Comment; 
import com.smp.main.service.CommentService;
 

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	CommentService commentService;
	@PostMapping("/addComment")
	public ResponseEntity<Comment> createComment(@RequestBody CommentDTO request) {
		// Extract content, userId, postId from request
        String content = request.getContent();
        Long userId = Long.valueOf(request.getUserId());
        String postId = request.getPostId();

        // Call service method to create comment
        Comment comment = commentService.createComment(content, userId, postId);
        System.out.print(comment.getContent());
        // Return ResponseEntity with created comment
        return ResponseEntity.ok(comment);
	}
	@PutMapping("/likeComment")
	public ResponseEntity<Comment> likeComment(@RequestParam("userId") Long userId,@RequestParam("commentId") String commentId ) {
		System.out.print(userId+" "+commentId);
		Comment comment= commentService.likeComment(commentId, userId);
		System.out.println(comment.getLikes());
		return  ResponseEntity.ok(comment);
	}
	@PutMapping("/unlikeComment")
	public ResponseEntity<Comment> unlikeComment(@RequestParam("userId") Long userId,@RequestParam("commentId") String commentId ) {
		System.out.print(userId+" "+commentId);
		Comment comment= commentService.unlikeComment(commentId, userId);
		System.out.println(comment.getLikes());
		return  ResponseEntity.ok(comment);
	}
	@DeleteMapping("/deleteComment")
	public String deleteComment(@RequestParam String commentID) {
		 return commentService.deleteComment(commentID);
	}
}
