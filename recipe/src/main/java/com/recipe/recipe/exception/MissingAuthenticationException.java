package com.recipe.recipe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class MissingAuthenticationException extends RuntimeException {
    public MissingAuthenticationException(String message) {
        super(message);
    }

    public MissingAuthenticationException() {
        super("Authentication is required to access this resource.");
    }
}