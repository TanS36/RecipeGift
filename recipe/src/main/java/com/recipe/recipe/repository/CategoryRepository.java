// CategoryRepository.java
package com.recipe.recipe.repository;

import com.recipe.recipe.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}