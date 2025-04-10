// UserService.java
package com.recipe.recipe.service;

import com.recipe.recipe.exception.ResourceNotFoundException;
import com.recipe.recipe.models.User;
import com.recipe.recipe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    // For regular user profile update
    public User updateUserProfile(Long userId, User updatedUser) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        existingUser.setName(updatedUser.getName());
        existingUser.setAge(updatedUser.getAge());
        existingUser.setProfilePictureUrl(updatedUser.getProfilePictureUrl());
        existingUser.setFavoriteFoods(updatedUser.getFavoriteFoods());
        return userRepository.save(existingUser);
    }

    // For admin to update user details (excluding email and password)
    public User updateUserByAdmin(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        existingUser.setName(updatedUser.getName());
        existingUser.setAge(updatedUser.getAge());
        existingUser.setProfilePictureUrl(updatedUser.getProfilePictureUrl());
        existingUser.setFavoriteFoods(updatedUser.getFavoriteFoods());
        return userRepository.save(existingUser);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    public User createUser(User newUser) {
        // You might want to add validation here to prevent creating users with admin privileges, etc.
        return userRepository.save(newUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}