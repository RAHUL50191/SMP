package com.smp.main.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
 
import com.smp.main.model.Reel;
import com.smp.main.model.User;

public interface ReelRepository extends MongoRepository<Reel, String>  {
//	List<Reel> findByUser_Id(Long id);
//	List<Reel> findByEmailReels(String email);
//	List<Reel> findByUserId(Long userId);
//	List<Reel> findByUserId(Long user);
//	List<Reel> findByUserEmail(String s);
	List<Reel> findByUser(Long user);
}
