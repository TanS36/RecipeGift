// UserController.java
package com.recipe.recipe.controller;

import com.recipe.recipe.models.User;
import com.recipe.recipe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

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
