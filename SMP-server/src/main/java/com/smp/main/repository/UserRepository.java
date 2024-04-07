package com.smp.main.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.smp.main.model.User;

public interface UserRepository  extends MongoRepository<User, Long>{
    @Query("{$or:[{'name': {$regex : ?0, $options: 'i'}}, {'email': {$regex : ?0, $options: 'i'}}]}")
    List<User> searchUser(String query);
    User findByName(String name);
    User findByEmail(String email); 
//    User findByJwt(String jwt); 
//    User findById(String id);
    

}
