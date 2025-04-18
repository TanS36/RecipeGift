package com.recipe.recipe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ForbiddenAccessException.class)
    public ResponseEntity<Map<String, Object>> handleForbiddenAccessException(ForbiddenAccessException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MissingAuthenticationException.class)
    public ResponseEntity<Map<String, Object>> handleMissingAuthenticationException(MissingAuthenticationException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidTokenException(InvalidTokenException ex) {
        return buildErrorResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGlobalException(Exception ex) {
        ex.printStackTrace(); // Log the full exception for debugging
        return buildErrorResponse("An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(String message, HttpStatus status) {
        return ResponseEntity.status(status)
                .body(Map.of(
                        "timestamp", LocalDateTime.now(),
                        "status", status.value(),
                        "error", status.getReasonPhrase(),
                        "message", message
                ));
    }
}