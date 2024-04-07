package com.smp.main.controller;

import org.springframework.http.MediaType;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.util.StreamUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.smp.main.exceptions.ReelNotExists;
import com.smp.main.model.Post;
import com.smp.main.model.Reel;
import com.smp.main.service.ReelService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
@RequestMapping("/reel")
public class ReelController {
	@Autowired
	ReelService reelService;
	  @Autowired
	    private GridFsOperations gridFsOperations;
	  
@PostMapping("/addReel")
public ResponseEntity<Reel> addReel(@RequestParam("title") String title,@RequestParam("file") MultipartFile file,@RequestParam("uid") Long uid) throws IOException {
    Reel r=reelService.addReel(title, file, uid);
    return new ResponseEntity<>(r,HttpStatus.CREATED);
}
//find all
@GetMapping("/all")
public ResponseEntity<List<Reel>> getAllReels(){
	List<Reel> reels=reelService.getAllReels();
	return ResponseEntity.ok(reels);
}

@GetMapping("/getReel/{pid}")
public ResponseEntity<Reel> getReel(@PathVariable("pid") String pid){
	Reel reel=reelService.getReel(pid);
	return ResponseEntity.ok(reel);
}
//@GetMapping("/{videoId}")
@SuppressWarnings("unused")
 
@GetMapping(value = "/{videoId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
public ResponseEntity<InputStreamResource> getVideoContent(@PathVariable String videoId, HttpServletResponse response) {
    GridFSFile videoFile = reelService.getVideoContent(videoId);

    response.setHeader("Content-Disposition", "attachment; filename=\"" + videoFile.getFilename() + "\"");
    response.setContentType(videoFile.getMetadata().get("_contentType").toString());
    if (videoFile != null) {
    	try (InputStream inputStream = videoFile.getObjectId() != null ? reelService.getVideoContentStream(videoId) : null) {
    		if (inputStream != null) {
    			byte[] buffer = new byte[1024];
    			int bytesRead;
    			while ((bytesRead = inputStream.read(buffer)) != -1) {
    				response.getOutputStream().write(buffer, 0, bytesRead);
    			}
    			response.flushBuffer();
    			return ResponseEntity.ok().build();
    		} else {
    			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    		}
    	} catch (IOException e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    	}
    } else {
        return ResponseEntity.notFound().build();
    }
}

//like
	@PutMapping("/likeReel")
	public ResponseEntity<Reel> likePost(@RequestParam("userId") Long userId,@RequestParam("reelId") String reelId ) {
		System.out.print(userId+" "+reelId);
		Reel reel= reelService.likeReel(reelId, userId);
		System.out.println(reel.getLikes());
		return  ResponseEntity.ok(reel);
	}
	@PutMapping("/unlikeReel")
	public ResponseEntity<Reel> unlikeReel(@RequestParam("userId") Long userId,@RequestParam("reelId") String reelId ) {
		System.out.print(userId+" "+reelId);
		Reel reel= reelService.unlikeReel(reelId, userId);
		System.out.println(reel.getLikes());
		return  ResponseEntity.ok(reel);
	}
	//delete
	@DeleteMapping("/deleteReel")
	public String deleteReel(@RequestParam("reelId") String reelID) {
		 return reelService.deleteReel(reelID);
	}
}
