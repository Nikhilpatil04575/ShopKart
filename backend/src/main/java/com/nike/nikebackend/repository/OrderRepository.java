package com.nike.nikebackend.repository;

import com.nike.nikebackend.model.Order;
import com.nike.nikebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByOrderDateDesc(User user);
}
