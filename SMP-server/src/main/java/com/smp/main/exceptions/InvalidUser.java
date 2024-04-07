package com.smp.main.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class InvalidUser extends RuntimeException {
 
	private static final long serialVersionUID = -7884401893181174628L;
	public InvalidUser(String msg) {
		super(msg);
	}
}
