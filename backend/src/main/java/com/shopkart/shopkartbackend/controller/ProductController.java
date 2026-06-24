package com.shopkart.shopkartbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping; // ✅ You missed this import
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopkart.shopkartbackend.model.Product;
import com.shopkart.shopkartbackend.services.ProductServices;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/products") // Base URL for this controller: /api/products
public class ProductController {

    @Autowired
    private ProductServices productServices;

    @GetMapping
    public List<Product> getAllProducts() {
        return productServices.getAllProducts();
    }
}
