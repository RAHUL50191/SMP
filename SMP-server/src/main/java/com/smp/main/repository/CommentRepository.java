package com.smp.main.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.smp.main.model.Comment;
public interface CommentRepository extends MongoRepository<Comment, String> {

}
