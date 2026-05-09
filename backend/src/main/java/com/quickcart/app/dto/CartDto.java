package com.quickcart.app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

public class CartDto {

    @Data
    public static class AddItemRequest {
        @NotNull
        private Long productId;
        @NotNull @Min(1)
        private Integer quantity;
    }

    @Data
    public static class UpdateItemRequest {
        @NotNull @Min(0)
        private Integer quantity;
    }

    @Data
    public static class ItemResponse {
        private Long id;
        private Long productId;
        private String productName;
        private String productImage;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal subtotal;
    }

    @Data
    public static class Response {
        private Long id;
        private List<ItemResponse> items;
        private BigDecimal total;
        private Integer itemCount;
    }
}
