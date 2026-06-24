package com.shopkart.shopkartbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.shopkart.shopkartbackend.model.CartItem;
import com.shopkart.shopkartbackend.model.Product;
import com.shopkart.shopkartbackend.model.User;

import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUser(User user);

    @Transactional
    @Modifying
    void deleteByUserAndProduct(User user, Product product);
}
