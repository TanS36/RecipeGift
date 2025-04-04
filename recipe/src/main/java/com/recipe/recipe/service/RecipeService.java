// RecipeService.java
package com.recipe.recipe.service;

import com.recipe.recipe.exception.ResourceNotFoundException;
import com.recipe.recipe.models.Recipe;
import com.recipe.recipe.models.User;
import com.recipe.recipe.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserService userService;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long recipeId) {
        return recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(Long recipeId, Recipe updatedRecipe) {
        Recipe existingRecipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + recipeId));
        updatedRecipe.setRecipeId(recipeId);
        return recipeRepository.save(updatedRecipe);
    }

    public void deleteRecipe(Long recipeId) {
        if (!recipeRepository.existsById(recipeId)) {
            throw new ResourceNotFoundException("Recipe not found with id: " + recipeId);
        }
        recipeRepository.deleteById(recipeId);
    }

    public List<Recipe> searchRecipes(String query) {
        return recipeRepository.findByNameContainingIgnoreCase(query);
    }

    public User addRecipeToFavorites(Long userId, Long recipeId) {
        User user = userService.getUserById(userId);
        Recipe recipe = getRecipeById(recipeId);
        if (user != null && recipe != null) {
            if (user.getFavoriteFoods() == null) {
                user.setFavoriteFoods(new java.util.ArrayList<>());
            }
            user.getFavoriteFoods().add(recipe.getName());
            return userService.updateUserProfile(userId, user);
        }
        return null;
    }

    public User removeRecipeFromFavorites(Long userId, Long recipeId) {
        User user = userService.getUserById(userId);
        Recipe recipe = getRecipeById(recipeId);
        if (user != null && recipe != null) {
            user.getFavoriteFoods().remove(recipe.getName());
            return userService.updateUserProfile(userId, user);
        }
        return null;
    }
}