package com.smp.main.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NO_CONTENT)
public class ReelNotExists extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public ReelNotExists(String msg) {
		super(msg);
	}

}
