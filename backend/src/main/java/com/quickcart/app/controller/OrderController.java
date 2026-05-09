package com.quickcart.app.controller;

import com.quickcart.app.dto.OrderDto;
import com.quickcart.app.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout/{userId}")
    public ResponseEntity<OrderDto.Response> checkout(@PathVariable Long userId,
                                                       @Valid @RequestBody OrderDto.CheckoutRequest req) {
        return ResponseEntity.ok(orderService.checkout(userId, req));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto.Response>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto.Response> getOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrder(orderId));
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<OrderDto.Response> updateStatus(@PathVariable Long orderId,
                                                           @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateStatus(orderId, status));
    }
}
