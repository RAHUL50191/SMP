package com.smp.main.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class InvalidPassword extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 3034079267341040218L;

	public InvalidPassword(String msg) { 
		super(msg);
	}
}
