package com.quickcart.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    @Data
    public static class CheckoutRequest {
        @NotBlank
        private String shippingAddress;
        @NotBlank
        private String paymentMethod;
    }

    @Data
    public static class ItemResponse {
        private Long productId;
        private String productName;
        private String productImage;
        private Integer quantity;
        private BigDecimal priceAtPurchase;
        private BigDecimal subtotal;
    }

    @Data
    public static class Response {
        private Long id;
        private List<ItemResponse> items;
        private BigDecimal totalAmount;
        private String status;
        private String shippingAddress;
        private String paymentMethod;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
