package com.smp.main.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.smp.main.model.Comment;
import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
 List<Comment> findByPostId(String postId);
}
