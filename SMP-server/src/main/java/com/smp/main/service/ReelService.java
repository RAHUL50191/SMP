package com.smp.main.service;

import java.awt.PageAttributes.MediaType;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.util.StreamUtils;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.client.gridfs.model.GridFSFile;

import com.mongodb.DBObject; 
import com.smp.main.exceptions.ReelNotExists;
import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.Comment; 
import com.smp.main.model.Reel;
import com.smp.main.model.User;
import com.smp.main.repository.ReelRepository;
import com.smp.main.repository.UserRepository;

@Service
public class ReelService {
 
	@Autowired	
	ReelRepository reelRepository;
	@Autowired
	GridFsTemplate gridFsTemplate;
	@Autowired
	GridFsOperations operation;

	@Autowired
	UserRepository userRepository;
 
 

	//video object id 
	public String addReelObj(String title,MultipartFile file) throws IOException {
		DBObject ob=new BasicDBObject();
		ob.put("title", title);
		ob.put("type","ReelDTO");
		ObjectId id= gridFsTemplate.store(file.getInputStream(),file.getName(),file.getContentType(),ob);
		return id.toString();
		
	}
	//Reel obj in db
	public Reel addReel(String title,MultipartFile file,Long userId) throws IOException {
		//get video id
		Reel r=new Reel();
		String vid=addReelObj(title,file);
		r.setDate(LocalDateTime.now());
		r.setTitle(title);
		//find user if exists
		User userx = userRepository.findById(userId).orElse(null);
		if (userx == null) {
			throw new UserNotExists("User not found with ID: " + userId);
		}
		r.setUser(userx);
		r.setVidObj(vid);
		
		List<Long> likes = new ArrayList<>();
		List<Comment> comments = new ArrayList<>(); 
		r.setLikes(likes);
		r.setComments(comments);
		r.setDate(LocalDateTime.now());

		// Save the reel
		return reelRepository.insert(r);
}
	//get Reel
	public Reel getReel(String reelID) {
		Reel reel=	reelRepository.findById(reelID).orElse(null);
		if(reel==null)
			throw new ReelNotExists("Reel not found"+reelID);
		User user=reel.getUser();
		//if user deleted account
		if(user==null) 
			throw new UserNotExists("User not found with PID: " + reelID);
		
		return reel;
	}
	
	//get all post by user
    public List<Reel> getAllReelsByUserId(Long userId) {
    	System.out.println(userId);
        return reelRepository.findByUserId(userId);
    }
    
    public List<Reel> getAllReelsByUser(Long userId) {
    	System.out.println(userId);
    	User user=userRepository.findById(userId).orElseThrow(()->new UserNotExists("User not found"+userId));
    	
        List<Reel> p=reelRepository.findByUser(user);
        return  p;
    }
	public List<Reel> getAllReels() {
		// TODO Auto-generated method stub
		List<Reel> reels=reelRepository.findAll();
		return reels;
	}
	//comment liked by users
	public Reel likeReel(String postID,Long userID) {
			Reel post=reelRepository.findById(postID).orElse(null);
 
			if(post!=null) {
					if(!post.getLikes().contains(userID)) {
					 post.getLikes().add(userID);
					}
					return reelRepository.save(post);
			}else {
				throw new ReelNotExists("post not found");
			}
			
			
		}
	//post unliked by users
	public Reel unlikeReel(String postID,Long userID) {
			Reel post=reelRepository.findById(postID).orElse(null);
	 
			if(post!=null) {
					if(post.getLikes().contains(userID)) {
					 post.getLikes().remove(userID);
					}
					return reelRepository.save(post);
			}else {
				throw new ReelNotExists("post not found");
			}
			
			
		}
	//delete post
	public String deleteReel(String postID) {
			Reel post=reelRepository.findById(postID).orElse(null);
			if(post!=null) {
				reelRepository.deleteById(postID);
				return "Successfully deleted";
			}
			else {
				throw new ReelNotExists("post not found");
			}
			
		}

    public GridFSFile getVideoContent(String vidObjId)  {
    	 
            // Retrieve the GridFS file by its ID
            GridFSFile videoFile = operation.findOne(new Query().addCriteria(Criteria.where("_id").is(new ObjectId(vidObjId))));
            if (videoFile != null) {
                return videoFile;
            } else {
                // If the video file is not found, return a 404 Not Found response
                throw new ReelNotExists(vidObjId);
            }
        
    }
    public InputStream getVideoContentStream(String vidObjId) throws IOException  {
	    // Retrieve the GridFS file by its ID
	    GridFSFile videoFile = operation.findOne(new Query().addCriteria(Criteria.where("_id").is(new ObjectId(vidObjId))));
	    if (videoFile != null) {
	        return gridFsTemplate.getResource(videoFile).getInputStream();
	    } else {
	        // If the video file is not found, return null or throw an exception
	        throw new ReelNotExists(vidObjId);
	    }
	}

    
}