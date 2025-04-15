package com.recipe.recipe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.recipe.recipe.models.User;
import com.recipe.recipe.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/api/admin/users")
    public void createUser(@RequestBody User user) {
        // Encode the password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        System.out.println("Encoded password: " + encodedPassword); // Add this line

        // Save the user to the database using userService
        userService.createUser(user);
    }

    @GetMapping("/profile")
    public User getProfile(@RequestParam Long userId) {
        return userService.getUserProfile(userId);
    }

    @PutMapping("/profile")
    public User updateProfile(@RequestParam Long userId, @RequestBody User updatedUser) {
        return userService.updateUserProfile(userId, updatedUser);
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }
}