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
        return authService.registerUser(body.get("email"), body.get("password"), body.get("name"));
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> body) {
        return authService.loginUser(body.get("email"), body.get("password"));

    }
}
