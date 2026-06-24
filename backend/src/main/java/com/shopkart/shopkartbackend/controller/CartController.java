package com.shopkart.shopkartbackend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopkart.shopkartbackend.security.JwtUtil;
import com.shopkart.shopkartbackend.services.CartService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    private String extractEmail(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return jwtUtil.extractUsername(token);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> data, HttpServletRequest request) {
        String email = extractEmail(request);
        Long productId = Long.valueOf(data.get("productId").toString());
        int quantity = Integer.parseInt(data.get("quantity").toString());
        cartService.addToCart(email, productId, quantity);
        return ResponseEntity.ok("Added to cart");
    }

    @GetMapping
    public ResponseEntity<?> getCart(HttpServletRequest request) {
        String email = extractEmail(request);
        return ResponseEntity.ok(cartService.getCart(email));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long productId, HttpServletRequest request) {
        String email = extractEmail(request);
        cartService.removeFromCart(email, productId);
        return ResponseEntity.ok("Removed from cart");
    }
}
