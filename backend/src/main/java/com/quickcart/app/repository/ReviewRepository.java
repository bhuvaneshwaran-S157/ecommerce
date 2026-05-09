package com.quickcart.app.repository;

import com.quickcart.app.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);
    boolean existsByProductIdAndUserId(Long productId, Long userId);
}
