package com.asdevify.react_aws.services;

import javax.management.RuntimeErrorException;

import org.springframework.stereotype.Service;

import com.asdevify.react_aws.models.ProductEntity;
import com.asdevify.react_aws.repositories.ProductRepo;

@Service
public class ProductService {

    private ProductRepo productRepo;

    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public ProductEntity createProduct(ProductEntity productEntity) throws Exception {

        try {
            return productRepo.save(productEntity);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

}
