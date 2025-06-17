package com.asdevify.react_aws.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.asdevify.react_aws.models.ProductEntity;
import com.asdevify.react_aws.services.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;
    Logger logger = LoggerFactory.getLogger(ProductController.class);

    public ProductController(ProductService pService) {

        System.out.println("✅ ProductController initialized");
        this.productService = pService;
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "Spring is running";
    }

    @PostMapping(value = "/create-product", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createProduct(@RequestPart("product") String productJson,
            @RequestPart("image") MultipartFile imageFile) {

        logger.info("Api called");
        System.out.println("AWS_KEY: " + System.getenv("AWS_ACCESS_KEY_ID"));
        System.out.println("AWS_SECRET: " + System.getenv("AWS_SECRET_ACCESS_KEY"));

        try {
            // Convert JSON string to object
            ObjectMapper objectMapper = new ObjectMapper();
            ProductEntity productEntity = objectMapper.readValue(productJson, ProductEntity.class);

            productService.createProduct(productEntity, imageFile);

            return new ResponseEntity<>("Product Created Successfully", HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/get-products")
    public ResponseEntity<?> getProducts() {

        try {

            List<ProductEntity> products = productService.getProducts();
            if (products == null) {
                return new ResponseEntity<>("Error occured", HttpStatus.BAD_REQUEST);

            }
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

}
