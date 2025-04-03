package com.recipe.recipe.service;

import com.recipe.recipe.exception.UserAlreadyExistsException;
import com.recipe.recipe.exception.InvalidCredentialsException;
import com.recipe.recipe.models.User;
import com.recipe.recipe.repository.UserRepository;
import com.recipe.recipe.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<Object> registerUser(String email, String password, String name, String provider) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + email + " already exists.");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        if (provider == null || provider.isEmpty()) {
            user.setProvider("local");
        } else {
            user.setProvider(provider);
        }

        userRepository.save(user);
        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully!"));
    }

    public String loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password."));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        return jwtUtil.generateToken(email);
    }
}
