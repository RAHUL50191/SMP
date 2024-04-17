 package com.smp.main.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.smp.main.exceptions.UserAlreadyExists;
import com.smp.main.exceptions.UserNotExists;
import com.smp.main.model.User;
import com.smp.main.repository.UserRepository;
import com.smp.main.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @GetMapping("/all")
    public List<User> getUsers() {
        List<User> users = userService.getAllUser();
        return users;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUser(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
    @GetMapping("/suggests")
    public ResponseEntity<Set<User>> getUserSuggests(@RequestHeader("Authorization") String jwt) {
    	User user=userService.getUserByToken(jwt);        
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        Set<User> suggests=userService.getUserSuggests(user,user.getFollowing());
        return ResponseEntity.ok(suggests);
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User savedUser = userService.addUser(user);
        System.out.println(savedUser.getEmail());
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String jwt,@RequestBody User updatedUser) {
    	User user=userService.getUserByToken(jwt);
    	if(user.getId()!=updatedUser.getId()) {
    		throw new BadCredentialsException("invalid access token");
    	}
        User updatedUserx = userService.updateUser(updatedUser);
        
        return ResponseEntity.ok(updatedUserx);
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<String> deleteUser(@RequestHeader("Authorization") String jwt) {
    	User user=userService.getUserByToken(jwt);
    
        userService.deleteUser(user.getId());
        return ResponseEntity.ok("User deleted successfully.");
    }

    @PutMapping("/followByName")
    public ResponseEntity<String> followUserByNameId(@RequestHeader("Authorization") String jwt, @RequestParam String followUserName) {
    	User user=userService.getUserByToken(jwt);
        userService.followUserByName(user.getId(), followUserName);
        return ResponseEntity.ok("User followed successfully.");
    }
    @PutMapping("/follow")
    public ResponseEntity<String> followUserById(@RequestHeader("Authorization") String jwt, @RequestParam Long followUserId) {
    	User user=userService.getUserByToken(jwt);
        userService.followUserById(user.getId(), followUserId);
        return ResponseEntity.ok("User followed successfully.");
    }
 
    @PutMapping("/unfollow")
    public ResponseEntity<String> unfollowUserById(@RequestHeader("Authorization") String jwt, @RequestParam Long unfollowUserId) {
    	User user=userService.getUserByToken(jwt);
    	if(user==null) {throw new UserNotExists("Failed Authentication:"+jwt);}
        userService.unfollowUserById(user.getId(), unfollowUserId);
        return ResponseEntity.ok("User unfollowed successfully.");
    }
 
    
//    @PutMapping("/{userName}/follow")
//    public ResponseEntity<String> followUser(@PathVariable String userName, @RequestParam String followUserName) {
//        userService.followUserByName(userName, followUserName);
//        return ResponseEntity.ok("User followed successfully.");
//    }

    @GetMapping("/following")
    public ResponseEntity<List<Long>> getFollowing(@RequestHeader("Authorization") String jwt) {
    	User user=userService.getUserByToken(jwt);
    	if(user==null) {throw new UserNotExists("No user with token:"+jwt);}
    	List<Long> following = userService.getFollowing(user.getId());
        return ResponseEntity.ok(following);
    }

    @GetMapping("/followers")
    public ResponseEntity<List<Long>> getFollowers(@RequestHeader("Authorization") String jwt) {
    	User user=userService.getUserByToken(jwt);
    	
    	if(user==null) {throw new UserNotExists("No user with token:"+jwt);}
    	List<Long> followers = userService.getFollowers(user.getId());
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/search/{qId}")
    public ResponseEntity<List<User>> searchUser(@PathVariable("qId") String qId) {
        List<User> searchResults = userService.searchUser(qId);
        return ResponseEntity.ok(searchResults);
    }
    
    @GetMapping("/jwt")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt) {
    	User user=userService.getUserByToken(jwt);
    	return user;
    }
}
