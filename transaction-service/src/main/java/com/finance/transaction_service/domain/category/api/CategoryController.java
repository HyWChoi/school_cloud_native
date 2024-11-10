package com.finance.transaction_service.domain.category.api;

import com.finance.transaction_service.domain.category.dto.CategoryCreateRequest;
import com.finance.transaction_service.domain.category.dto.CategoryListResponse;
import com.finance.transaction_service.domain.category.dto.CategoryResponse;
import com.finance.transaction_service.domain.category.dto.CategoryUpdateRequest;
import com.finance.transaction_service.domain.category.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction_service/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(
            @RequestHeader("X-USER-ID") Long profileId,
            @Valid @RequestBody CategoryCreateRequest request) {
        return ResponseEntity.ok(categoryService.createCategory(profileId, request));
    }

    @GetMapping
    public ResponseEntity<CategoryListResponse> getCategories(
            @RequestHeader("X-USER-ID") Long profileId) {
        return ResponseEntity.ok(categoryService.getCategoriesByProfileId(profileId));
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @RequestHeader("X-USER-ID") Long profileId,
            @PathVariable Long categoryId,
            @Valid @RequestBody CategoryUpdateRequest request) {
        return ResponseEntity.ok(categoryService.updateCategory(profileId, categoryId, request));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(
            @RequestHeader("X-USER-ID") Long profileId,
            @PathVariable Long categoryId) {
        categoryService.deleteCategory(profileId, categoryId);
        return ResponseEntity.noContent().build();
    }
}

