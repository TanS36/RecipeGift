package com.recipe.recipe.controller;

import com.recipe.recipe.service.AuthService;
import com.recipe.recipe.security.JwtUtil;
import com.recipe.recipe.models.User;
import com.recipe.recipe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil; // Inject JwtUtil

    @Autowired
    private UserService userService;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody Map<String, String> body) {
        return authService.registerUser(body.get("email"), body.get("password"), body.get("name"), body.get("provider"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        // Check if it's an admin login
        if (adminUsername.equals(email) && adminPassword.equals(password)) {
            String token = jwtUtil.generateToken(email, "ROLE_ADMIN");
            System.out.println("Generated Admin Token: " + token); // Add this line
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        } else {
            String token = authService.loginUser(email, password);
            System.out.println("Generated User Token: " + token); // Add this line
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        }
    }

    @GetMapping("/admin/users") // Added endpoint
    public ResponseEntity<List<User>> getAllUsersForAdmin() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/admin/users")
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        User createdUser = userService.createUser(newUser);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/admin/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User updated = userService.updateUserByAdmin(id, updatedUser);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
}