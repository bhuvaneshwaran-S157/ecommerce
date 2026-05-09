package com.quickcart.app.controller;

import com.quickcart.app.dto.ReviewDto;
import com.quickcart.app.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewDto.Response>> getReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getProductReviews(productId));
    }

    @PostMapping
    public ResponseEntity<ReviewDto.Response> addReview(@PathVariable Long productId,
                                                         @RequestParam Long userId,
                                                         @Valid @RequestBody ReviewDto.Request req) {
        return ResponseEntity.ok(reviewService.addReview(productId, userId, req));
    }
}
