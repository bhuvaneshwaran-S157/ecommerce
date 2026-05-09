package com.quickcart.app.service;

import com.quickcart.app.dto.CartDto;
import com.quickcart.app.entity.*;
import com.quickcart.app.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductService productService;

    public CartDto.Response getCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        return toResponse(cart);
    }

    public CartDto.Response addItem(Long userId, CartDto.AddItemRequest req) {
        Cart cart = getOrCreateCart(userId);
        Product product = productService.findById(req.getProductId());

        cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(req.getProductId()))
                .findFirst()
                .ifPresentOrElse(
                        i -> i.setQuantity(i.getQuantity() + req.getQuantity()),
                        () -> {
                            CartItem item = new CartItem();
                            item.setCart(cart);
                            item.setProduct(product);
                            item.setQuantity(req.getQuantity());
                            cart.getItems().add(item);
                        }
                );
        return toResponse(cartRepository.save(cart));
    }

    public CartDto.Response updateItem(Long userId, Long itemId, CartDto.UpdateItemRequest req) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (req.getQuantity() == 0) {
            cart.getItems().remove(item);
        } else {
            item.setQuantity(req.getQuantity());
        }
        return toResponse(cartRepository.save(cart));
    }

    public CartDto.Response removeItem(Long userId, Long itemId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().removeIf(i -> i.getId().equals(itemId));
        return toResponse(cartRepository.save(cart));
    }

    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        });
    }

    private CartDto.Response toResponse(Cart cart) {
        List<CartDto.ItemResponse> items = cart.getItems().stream().map(i -> {
            CartDto.ItemResponse ir = new CartDto.ItemResponse();
            ir.setId(i.getId());
            ir.setProductId(i.getProduct().getId());
            ir.setProductName(i.getProduct().getName());
            ir.setProductImage(i.getProduct().getImageUrl());
            ir.setPrice(i.getProduct().getPrice());
            ir.setQuantity(i.getQuantity());
            ir.setSubtotal(i.getProduct().getPrice().multiply(BigDecimal.valueOf(i.getQuantity())));
            return ir;
        }).collect(Collectors.toList());

        BigDecimal total = items.stream().map(CartDto.ItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        CartDto.Response res = new CartDto.Response();
        res.setId(cart.getId());
        res.setItems(items);
        res.setTotal(total);
        res.setItemCount(items.stream().mapToInt(CartDto.ItemResponse::getQuantity).sum());
        return res;
    }
}
