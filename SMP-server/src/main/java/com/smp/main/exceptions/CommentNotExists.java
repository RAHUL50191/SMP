package com.smp.main.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CommentNotExists extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public CommentNotExists(String msg) {
		super(msg);
	}
}
