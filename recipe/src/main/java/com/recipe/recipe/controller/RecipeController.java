// RecipeController.java
package com.recipe.recipe.controller;

import com.recipe.recipe.models.Recipe;
import com.recipe.recipe.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.recipe.recipe.models.User;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/{recipeId}")
    public Recipe getRecipe(@PathVariable Long recipeId) {
        return recipeService.getRecipeById(recipeId);
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @PutMapping("/{recipeId}")
    public Recipe updateRecipe(@PathVariable Long recipeId, @RequestBody Recipe updatedRecipe) {
        return recipeService.updateRecipe(recipeId, updatedRecipe);
    }

    @DeleteMapping("/{recipeId}")
    public void deleteRecipe(@PathVariable Long recipeId) {
        recipeService.deleteRecipe(recipeId);
    }

    @GetMapping("/search")
    public List<Recipe> searchRecipes(@RequestParam String query) {
        return recipeService.searchRecipes(query);
    }

    @PostMapping("/{recipeId}/favorite")
    public User addFavorite(@RequestParam Long userId, @PathVariable Long recipeId) {
        return recipeService.addRecipeToFavorites(userId, recipeId);
    }

    @DeleteMapping("/{recipeId}/favorite")
    public User removeFavorite(@RequestParam Long userId, @PathVariable Long recipeId) {
        return recipeService.removeRecipeFromFavorites(userId, recipeId);
    }
}