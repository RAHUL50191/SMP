package com.smp.main.exceptions;
 

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadReqException extends RuntimeException{

 
	private static final long serialVersionUID = 1L;
 

	public BadReqException(String msg) {
		super(msg);
	}
	
}
