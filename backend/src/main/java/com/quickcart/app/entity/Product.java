package com.quickcart.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String imageUrl;
    private String category;
    private String brand;

    @Column(nullable = false)
    private Integer stock = 0;

    private Double rating = 0.0;
    private Integer reviewCount = 0;
}
