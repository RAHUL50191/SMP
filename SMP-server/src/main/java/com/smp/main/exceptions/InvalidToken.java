package com.smp.main.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InvalidToken extends RuntimeException{
  static final long serialVersionUID = 1L;

public InvalidToken(String msg) {
	super(msg);
}
}
