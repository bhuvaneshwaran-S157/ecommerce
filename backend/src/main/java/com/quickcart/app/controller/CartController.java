package com.quickcart.app.controller;

import com.quickcart.app.dto.CartDto;
import com.quickcart.app.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto.Response> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<CartDto.Response> addItem(@PathVariable Long userId,
                                                     @Valid @RequestBody CartDto.AddItemRequest req) {
        return ResponseEntity.ok(cartService.addItem(userId, req));
    }

    @PutMapping("/{userId}/items/{itemId}")
    public ResponseEntity<CartDto.Response> updateItem(@PathVariable Long userId,
                                                        @PathVariable Long itemId,
                                                        @Valid @RequestBody CartDto.UpdateItemRequest req) {
        return ResponseEntity.ok(cartService.updateItem(userId, itemId, req));
    }

    @DeleteMapping("/{userId}/items/{itemId}")
    public ResponseEntity<CartDto.Response> removeItem(@PathVariable Long userId,
                                                        @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItem(userId, itemId));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
