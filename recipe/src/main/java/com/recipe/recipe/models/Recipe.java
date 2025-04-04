package com.recipe.recipe.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipeId;

    private String name;
    private String description;
    private String imageUrl;
    private String category;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;
}
