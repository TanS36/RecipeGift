package com.recipe.recipe.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String name;

    private Integer age;

    private String profilePictureUrl;

    @ElementCollection
    private List<String> favoriteFoods;

    private String providerType; // "local" or "google"
}