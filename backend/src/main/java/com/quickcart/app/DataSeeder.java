package com.quickcart.app;

import com.quickcart.app.entity.Product;
import com.quickcart.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) return;

        productRepository.saveAll(List.of(
            product("iPhone 15 Pro", "Latest Apple flagship with A17 Pro chip", new BigDecimal("999.99"), "Electronics", "Apple", 50, "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400"),
            product("Samsung Galaxy S24", "Android flagship with AI features", new BigDecimal("849.99"), "Electronics", "Samsung", 40, "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"),
            product("Sony WH-1000XM5", "Industry-leading noise cancelling headphones", new BigDecimal("349.99"), "Electronics", "Sony", 100, "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400"),
            product("MacBook Air M3", "Thin, light, and incredibly powerful", new BigDecimal("1299.99"), "Electronics", "Apple", 30, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"),
            product("Nike Air Max 270", "Comfortable everyday sneakers", new BigDecimal("129.99"), "Footwear", "Nike", 200, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"),
            product("Adidas Ultraboost 23", "High-performance running shoes", new BigDecimal("179.99"), "Footwear", "Adidas", 150, "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400"),
            product("Levi's 501 Jeans", "Classic straight fit denim jeans", new BigDecimal("59.99"), "Clothing", "Levi's", 300, "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"),
            product("The North Face Jacket", "Waterproof outdoor jacket", new BigDecimal("249.99"), "Clothing", "The North Face", 80, "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"),
            product("Instant Pot Duo 7-in-1", "Multi-use pressure cooker", new BigDecimal("89.99"), "Home & Kitchen", "Instant Pot", 120, "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400"),
            product("Dyson V15 Vacuum", "Powerful cordless vacuum cleaner", new BigDecimal("699.99"), "Home & Kitchen", "Dyson", 60, "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"),
            product("Kindle Paperwhite", "Waterproof e-reader with 6.8\" display", new BigDecimal("139.99"), "Electronics", "Amazon", 200, "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400"),
            product("LEGO Technic Set", "Advanced building set for adults", new BigDecimal("79.99"), "Toys", "LEGO", 90, "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400"),
            product("Yoga Mat Premium", "Non-slip eco-friendly yoga mat", new BigDecimal("49.99"), "Sports", "Manduka", 250, "https://images.unsplash.com/photo-1601925228008-f5e4c5e5e5e5?w=400"),
            product("Protein Powder Whey", "Chocolate flavored whey protein 5lb", new BigDecimal("54.99"), "Sports", "Optimum Nutrition", 180, "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400"),
            product("Harry Potter Box Set", "Complete 7-book hardcover collection", new BigDecimal("89.99"), "Books", "Bloomsbury", 75, "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"),
            product("iPad Air 5th Gen", "Powerful tablet with M1 chip", new BigDecimal("749.99"), "Electronics", "Apple", 45, "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400")
        ));
    }

    private Product product(String name, String desc, BigDecimal price, String category, String brand, int stock, String img) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setPrice(price);
        p.setCategory(category);
        p.setBrand(brand);
        p.setStock(stock);
        p.setImageUrl(img);
        p.setRating(4.0 + Math.random());
        p.setReviewCount((int)(Math.random() * 500));
        return p;
    }
}
