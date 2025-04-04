// RecipeRepository.java
package com.recipe.recipe.repository;

import com.recipe.recipe.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByNameContainingIgnoreCase(String query);
}