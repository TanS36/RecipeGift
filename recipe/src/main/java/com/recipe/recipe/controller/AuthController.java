package com.recipe.recipe.controller;

import com.recipe.recipe.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody Map<String, String> body) {
        // Make sure 'name' is correctly extracted from the request body
        String email = body.get("email");
        String password = body.get("password");
        String name = body.get("name");  // Accessing the 'name' field from the map

        // Call the AuthService with the correct parameters
        return authService.registerUser(email, password, name);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> body) {
        return authService.loginUser(body.get("email"), body.get("password"));
    }

    // Exception handler for RuntimeException (like email already exists)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST) // Return 400 Bad Request
                .body(Map.of("error", ex.getMessage()));
    }
}