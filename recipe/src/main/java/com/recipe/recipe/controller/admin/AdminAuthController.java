package com.recipe.recipe.controller.admin;

import com.recipe.recipe.models.User; // Assuming you have a User model
import com.recipe.recipe.service.UserService; // Assuming you have a UserService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse; // Changed import
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminAuthController {

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsersForAdmin() {
        // Implement logic to fetch all users (or a subset)
        List<User> users = userService.getAllUsers(); // Assuming this method exists in your UserService
        return ResponseEntity.ok(users);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> adminLogin(@RequestBody Map<String, String> credentials,
                                                          HttpServletResponse response) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (adminUsername.equals(username) && adminPassword.equals(password)) {
            // In a more secure scenario, you might generate a short-lived, admin-specific JWT here
            // and return it. For this simplified approach, you could set a cookie.
            // Example of setting an HTTP-only cookie (more secure than a JS-accessible token):
            // String adminToken = generateAdminToken(); // Implement a token generation logic
            // response.setHeader("Set-Cookie", "admin_token=" + adminToken + "; HttpOnly; Secure; Path=/");

            return ResponseEntity.ok(Map.of("message", "Admin login successful"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }
}