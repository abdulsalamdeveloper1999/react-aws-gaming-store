package com.asdevify.react_aws.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asdevify.react_aws.models.ProductEntity;
import com.asdevify.react_aws.services.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService pService) {
        System.out.println("✅ ProductController initialized");
        this.productService = pService;
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "Spring is running";
    }

    @PostMapping("/create-product")
    public ResponseEntity<String> createProduct(@RequestBody ProductEntity productEntity) {

        try {

            productService.createProduct(productEntity);

            return new ResponseEntity<>("Product Created Successfully", HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
        }

    }

}
