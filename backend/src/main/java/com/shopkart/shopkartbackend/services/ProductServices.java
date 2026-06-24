package com.shopkart.shopkartbackend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopkart.shopkartbackend.model.Product;
import com.shopkart.shopkartbackend.repository.ProductRepository;

@Service
public class ProductServices {
	@Autowired
	ProductRepository productRepository;

	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	public Optional<Product> findById(Long id) {
		return productRepository.findById(id);
	}
}
