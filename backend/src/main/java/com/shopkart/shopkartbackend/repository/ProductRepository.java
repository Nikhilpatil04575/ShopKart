package com.nike.nikebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nike.nikebackend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
