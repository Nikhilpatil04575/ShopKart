package com.shopkart.shopkartbackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopkart.shopkartbackend.model.CartItem;
import com.shopkart.shopkartbackend.model.Product;
import com.shopkart.shopkartbackend.model.User;
import com.shopkart.shopkartbackend.repository.CartItemRepository;
import com.shopkart.shopkartbackend.repository.ProductRepository;
import com.shopkart.shopkartbackend.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    public void addToCart(String email, Long productId, int quantity) {
        User user = userRepo.findByEmail(email).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();

        CartItem item = new CartItem();
        item.setUser(user);
        item.setProduct(product);
        item.setQuantity(quantity);
        cartRepo.save(item);
    }

    public List<CartItem> getCart(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();
        return cartRepo.findByUser(user);
    }

    public void removeFromCart(String email, Long productId) {
        User user = userRepo.findByEmail(email).orElseThrow();
        Product product = productRepo.findById(productId).orElseThrow();
        cartRepo.deleteByUserAndProduct(user, product);
    }
}
