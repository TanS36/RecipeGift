package com.recipe.recipe.controller;

import com.recipe.recipe.models.FavoriteFood;
import com.recipe.recipe.service.FavoriteFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FavoriteFoodController {

    @Autowired
    private FavoriteFoodService favoriteFoodService;

    @GetMapping("/favorites")
    public List<FavoriteFood> getFavoriteFoods() {
        return favoriteFoodService.getAllFavoriteFoods();
    }
}
