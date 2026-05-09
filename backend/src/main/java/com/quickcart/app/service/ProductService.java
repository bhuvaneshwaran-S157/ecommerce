package com.quickcart.app.service;

import com.quickcart.app.dto.ProductDto;
import com.quickcart.app.entity.Product;
import com.quickcart.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductDto.Response> getAll(String category, String search, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        String cat = (category == null || category.isBlank()) ? null : category;
        String srch = (search == null || search.isBlank()) ? null : search;
        return productRepository.findWithFilters(cat, srch, pageable).map(this::toResponse);
    }

    public ProductDto.Response getById(Long id) {
        return toResponse(findById(id));
    }

    public ProductDto.Response create(ProductDto.Request req) {
        Product p = new Product();
        mapRequest(req, p);
        return toResponse(productRepository.save(p));
    }

    public ProductDto.Response update(Long id, ProductDto.Request req) {
        Product p = findById(id);
        mapRequest(req, p);
        return toResponse(productRepository.save(p));
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public List<String> getCategories() {
        return productRepository.findAll().stream()
                .map(Product::getCategory)
                .filter(c -> c != null && !c.isBlank())
                .distinct()
                .collect(Collectors.toList());
    }

    private void mapRequest(ProductDto.Request req, Product p) {
        p.setName(req.getName());
        p.setDescription(req.getDescription());
        p.setPrice(req.getPrice());
        p.setImageUrl(req.getImageUrl());
        p.setCategory(req.getCategory());
        p.setBrand(req.getBrand());
        p.setStock(req.getStock());
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductDto.Response toResponse(Product p) {
        ProductDto.Response res = new ProductDto.Response();
        res.setId(p.getId());
        res.setName(p.getName());
        res.setDescription(p.getDescription());
        res.setPrice(p.getPrice());
        res.setImageUrl(p.getImageUrl());
        res.setCategory(p.getCategory());
        res.setBrand(p.getBrand());
        res.setStock(p.getStock());
        res.setRating(p.getRating());
        res.setReviewCount(p.getReviewCount());
        return res;
    }
}
