package com.shopkart.shopkartbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopkart.shopkartbackend.model.Order;
import com.shopkart.shopkartbackend.model.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByOrderDateDesc(User user);
}
