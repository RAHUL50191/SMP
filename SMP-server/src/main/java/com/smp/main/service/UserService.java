package com.smp.main.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.BadRequest;

import com.smp.main.config.jwtProvider;
import com.smp.main.exceptions.BadReqException;
import com.smp.main.exceptions.UserAlreadyExists;
import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.User;
import com.smp.main.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	private final MongoTemplate mongoTemplate;

	public UserService(MongoTemplate mongoTemplate) {
	    this.mongoTemplate = mongoTemplate;
	}
	//add user
	// Add user
	public User addUser(User newUser) {
	    // Check if the user already exists
	    User existingUserId = userRepository.findById(newUser.getId()).orElse(null);
	    User existingUserName = userRepository.findByName(newUser.getName());
	    User existingUserEmail = userRepository.findByEmail(newUser.getEmail());
	    if (existingUserId == null && existingUserName == null && existingUserEmail == null) {
	        // Initialize following and followers lists
	        List<Long> following = newUser.getFollowing() != null ? newUser.getFollowing() : new ArrayList<>();
	        List<Long> followers = newUser.getFollowers() != null ? newUser.getFollowers() : new ArrayList<>();
	        List<String> saved = newUser.getSaved() != null ? newUser.getSaved() : new ArrayList<>();
	        LocalDateTime date = LocalDateTime.now();
	        // Set the initialized lists
	        newUser.setFollowing(following);
	        newUser.setFollowers(followers);
	        newUser.setSaved(saved);
	        newUser.setDate(date);
	        // Insert the new user
	        return userRepository.insert(newUser);
	    } else {
	        throw new UserAlreadyExists("User already exists");
	    }
	}

	//get all users
	public List<User> getAllUser() {
		// TODO Auto-generated method stub
		List<User> users=userRepository.findAll();
		return users;
	}
	//get user by id
	public User getUser(Long id) {
		User user=userRepository.findById(id).orElseThrow(()->new UserNotExists("User not found"+id));
		return user;
	}
	//Put user 
	public User updateUser(User updatedUser) {
		// Check if the user already exists
	    User existingUserId = userRepository.findById(updatedUser.getId()).orElse(null);

	    if (existingUserId != null) {
	        // Initialize following and followers lists
	        List<Long> following = updatedUser.getFollowing() != null ? updatedUser.getFollowing() : existingUserId.getFollowing();
	        List<Long> followers = updatedUser.getFollowers() != null ? updatedUser.getFollowers() : existingUserId.getFollowers();
	        List<String> saved = updatedUser.getSaved() != null ? updatedUser.getSaved() : existingUserId.getSaved();
	        
	        following.forEach(userId -> followUserById(updatedUser.getId(),userId));
	        followers.forEach(userId -> followUserById(userId,updatedUser.getId()));
	        
	        updatedUser.setFollowing(following);
	        updatedUser.setFollowers(followers);
	        updatedUser.setSaved(saved);
	        updatedUser.setDate(existingUserId.getDate());
	        return userRepository.save(updatedUser);
	      
	    } else {
	        throw new UserNotExists("User not exists");
	    }
		
		
	}
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
	//update follow & follower

    public void followUserByName(Long userId, String followUserName) {
        User user = userRepository.findById(userId).orElse(null);
        User followUser = userRepository.findByName(followUserName);
        if(user==followUser) {
	    	  throw new BadReqException("Self obsession!!");
	    }
        if (user != null && followUser != null) {
            // Update the following list of the current user
            if (!user.getFollowing().contains(followUser.getId())) {
                user.getFollowing().add(followUser.getId());
                mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(user.getId())),
                        new Update().addToSet("following", followUser.getId()), User.class);
            }

            // Update the followers list of the follow user
            if (!followUser.getFollowers().contains(user.getId())) {
                followUser.getFollowers().add(user.getId());
                mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(followUser.getId())),
                        new Update().addToSet("followers", user.getId()), User.class);
            }
        } else {
            throw new UserNotExists("User or follow user not found.");
        }
    }
    public void followUserById(Long userId, Long followUserId) {
    	 User user = userRepository.findById(userId).orElse(null);
         User followUser = userRepository.findById(followUserId).orElse(null);
         System.out.println(user.getId()+" "+followUser.getId());
         if(user.getId()==followUser.getId()) {
	    	  throw new BadReqException("Self obsession!!");
	    }
         if (user != null && followUser != null) {
             // Update the following list of the current user
             if (!user.getFollowing().contains(followUser.getId())) {
                 user.getFollowing().add(followUser.getId());
                 mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(user.getId())),
                         new Update().addToSet("following", followUser.getId()), User.class);
             }

             // Update the followers list of the follow user
             if (!followUser.getFollowers().contains(user.getId())) {
                 followUser.getFollowers().add(user.getId());
                 mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(followUser.getId())),
                         new Update().addToSet("followers", user.getId()), User.class);
             }
         } else {
             throw new UserNotExists("User or follow user not found.");
         }
		
	}
    public void unfollowUserById(Long userId, Long unfollowUserId) {
    	  User user = userRepository.findById(userId).orElse(null);
    	    User unfollowUser = userRepository.findById(unfollowUserId).orElse(null);
    	    if(user==unfollowUser) {
    	    	  throw new BadReqException("No one likes you,Not even you!!");
    	    }
    	    if (user != null && unfollowUser != null) {
    	        // Remove the unfollow user from the following list of the current user
    	        if (user.getFollowing().contains(unfollowUser.getId())) {
    	            user.getFollowing().remove(unfollowUser.getId());
    	            mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(user.getId())),
    	                    new Update().pull("following", unfollowUser.getId()), User.class);
    	        }

    	        // Remove the current user from the followers list of the unfollow user
    	        if (unfollowUser.getFollowers().contains(user.getId())) {
    	            unfollowUser.getFollowers().remove(user.getId());
    	            mongoTemplate.updateFirst(Query.query(Criteria.where("id").is(unfollowUser.getId())),
    	                    new Update().pull("followers", user.getId()), User.class);
    	        }
    	    } else {
    	        throw new UserNotExists("User or unfollow user not found.");
    	    }
	}
    //get following by uid
    public List<Long> getFollowing(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotExists("User not found."));
        return user.getFollowing();
    }
    //get followers by uid
    public List<Long> getFollowers(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotExists("User not found."));
        return user.getFollowers();
    }
    //search query name or email
    public List<User> searchUser(String query) {
        // Delegate the search operation to the UserRepository method
        return userRepository.searchUser(query);
    }
	public User getUserByToken(String jwt) {
		String email=jwtProvider.getEmailFromJwtToken(jwt);
		 User user=userRepository.findByEmail(email);
		 if(user==null)throw new UserNotExists("NO user with token:"+jwt);
		return user;
	}
	public Set<User> getUserSuggests(User user,List<Long> following) {
		Set<User> suggestedUsers = new HashSet<>();

        for (Long userId : following) {
            List<Long> userFollowing = getFollowing(userId);
           
            for (Long followingUserId : userFollowing) {
                if (!following.contains(followingUserId) && user.getId()!=followingUserId) {
                	//add not following user
                    User suggestedUser = getUser(followingUserId);
                    
                    suggestedUsers.add(suggestedUser);
                }
            }
        }
        return suggestedUsers;
	}
	
	
	
}