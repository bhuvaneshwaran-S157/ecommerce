package com.quickcart.app.service;

import com.quickcart.app.dto.ReviewDto;
import com.quickcart.app.entity.*;
import com.quickcart.app.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public ReviewDto.Response addReview(Long productId, Long userId, ReviewDto.Request req) {
        if (reviewRepository.existsByProductIdAndUserId(productId, userId))
            throw new RuntimeException("You have already reviewed this product");

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setRating(req.getRating());
        review.setComment(req.getComment());
        Review saved = reviewRepository.save(review);

        updateProductRating(product);
        return toResponse(saved);
    }

    public List<ReviewDto.Response> getProductReviews(Long productId) {
        return reviewRepository.findByProductId(productId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private void updateProductRating(Product product) {
        List<Review> reviews = reviewRepository.findByProductId(product.getId());
        double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
        product.setRating(Math.round(avg * 10.0) / 10.0);
        product.setReviewCount(reviews.size());
        productRepository.save(product);
    }

    private ReviewDto.Response toResponse(Review r) {
        ReviewDto.Response res = new ReviewDto.Response();
        res.setId(r.getId());
        res.setUserId(r.getUser().getId());
        res.setUserName(r.getUser().getName());
        res.setRating(r.getRating());
        res.setComment(r.getComment());
        res.setCreatedAt(r.getCreatedAt());
        return res;
    }
}
