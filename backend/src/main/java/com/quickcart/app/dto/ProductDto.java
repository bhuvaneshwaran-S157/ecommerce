package com.quickcart.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

public class ProductDto {

    @Data
    public static class Request {
        @NotBlank
        private String name;
        private String description;
        @NotNull @Positive
        private BigDecimal price;
        private String imageUrl;
        private String category;
        private String brand;
        @NotNull
        private Integer stock;
    }

    @Data
    public static class Response {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private String imageUrl;
        private String category;
        private String brand;
        private Integer stock;
        private Double rating;
        private Integer reviewCount;
    }
}
