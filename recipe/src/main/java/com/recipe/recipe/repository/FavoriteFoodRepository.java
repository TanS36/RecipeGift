package com.recipe.recipe.repository;

import com.recipe.recipe.models.FavoriteFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteFoodRepository extends JpaRepository<FavoriteFood, Long> {
}
