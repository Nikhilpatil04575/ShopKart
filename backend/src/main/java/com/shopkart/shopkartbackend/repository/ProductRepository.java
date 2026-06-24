package com.shopkart.shopkartbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopkart.shopkartbackend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
