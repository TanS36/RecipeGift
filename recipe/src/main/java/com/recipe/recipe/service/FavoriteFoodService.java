package com.recipe.recipe.service;

import com.recipe.recipe.models.FavoriteFood;
import com.recipe.recipe.repository.FavoriteFoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteFoodService {

    @Autowired
    private FavoriteFoodRepository favoriteFoodRepository;

    public List<FavoriteFood> getAllFavoriteFoods() {
        return favoriteFoodRepository.findAll();
    }
}
