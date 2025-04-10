package com.recipe.recipe.security;

import com.recipe.recipe.models.User;
import com.recipe.recipe.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .map(user -> new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        getAuthorities(user) // Method to get user authorities
                ))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }

    private List<SimpleGrantedAuthority> getAuthorities(User user) {
        // Assuming your User entity has a 'roles' field (e.g., a List<String>)
        // You might need to adjust this based on your actual User model and role storage
        if (user.getProviderType() != null && user.getProviderType().equals("google") && user.getEmail().equals("your_admin_google_email@example.com")) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        if (user.getEmail().equals("admin01@example.com")) { // Example for local admin
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        // Default role for other users
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }
}