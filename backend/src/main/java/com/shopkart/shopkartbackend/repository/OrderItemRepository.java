package com.shopkart.shopkartbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopkart.shopkartbackend.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
