package com.quickcart.app.service;

import com.quickcart.app.dto.OrderDto;
import com.quickcart.app.entity.*;
import com.quickcart.app.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartService cartService;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderDto.Response checkout(Long userId, OrderDto.CheckoutRequest req) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart is empty"));
        if (cart.getItems().isEmpty()) throw new RuntimeException("Cart is empty");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(req.getShippingAddress());
        order.setPaymentMethod(req.getPaymentMethod());

        List<OrderItem> orderItems = cart.getItems().stream().map(ci -> {
            if (ci.getProduct().getStock() < ci.getQuantity())
                throw new RuntimeException("Insufficient stock for: " + ci.getProduct().getName());

            ci.getProduct().setStock(ci.getProduct().getStock() - ci.getQuantity());
            productRepository.save(ci.getProduct());

            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(ci.getProduct());
            oi.setQuantity(ci.getQuantity());
            oi.setPriceAtPurchase(ci.getProduct().getPrice());
            return oi;
        }).collect(Collectors.toList());

        order.setItems(orderItems);
        order.setTotalAmount(orderItems.stream()
                .map(oi -> oi.getPriceAtPurchase().multiply(BigDecimal.valueOf(oi.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        Order saved = orderRepository.save(order);
        cartService.clearCart(userId);
        return toResponse(saved);
    }

    public List<OrderDto.Response> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public OrderDto.Response getOrder(Long orderId) {
        return toResponse(orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found")));
    }

    public OrderDto.Response updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.Status.valueOf(status.toUpperCase()));
        order.setUpdatedAt(LocalDateTime.now());
        return toResponse(orderRepository.save(order));
    }

    private OrderDto.Response toResponse(Order order) {
        List<OrderDto.ItemResponse> items = order.getItems().stream().map(oi -> {
            OrderDto.ItemResponse ir = new OrderDto.ItemResponse();
            ir.setProductId(oi.getProduct().getId());
            ir.setProductName(oi.getProduct().getName());
            ir.setProductImage(oi.getProduct().getImageUrl());
            ir.setQuantity(oi.getQuantity());
            ir.setPriceAtPurchase(oi.getPriceAtPurchase());
            ir.setSubtotal(oi.getPriceAtPurchase().multiply(BigDecimal.valueOf(oi.getQuantity())));
            return ir;
        }).collect(Collectors.toList());

        OrderDto.Response res = new OrderDto.Response();
        res.setId(order.getId());
        res.setItems(items);
        res.setTotalAmount(order.getTotalAmount());
        res.setStatus(order.getStatus().name());
        res.setShippingAddress(order.getShippingAddress());
        res.setPaymentMethod(order.getPaymentMethod());
        res.setCreatedAt(order.getCreatedAt());
        res.setUpdatedAt(order.getUpdatedAt());
        return res;
    }
}
