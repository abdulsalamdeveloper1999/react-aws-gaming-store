package com.asdevify.react_aws.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.asdevify.react_aws.models.ProductEntity;
import com.asdevify.react_aws.repositories.ProductRepo;

@Service
public class ProductService {

    private ProductRepo productRepo;
    private S3Service s3Service;

    @Value("${aws.region}")
    private String awsRegion;

    public ProductService(ProductRepo productRepo, S3Service s3Service) {
        this.productRepo = productRepo;
        this.s3Service = s3Service;
    }

    public ProductEntity createProduct(ProductEntity productEntity, MultipartFile image) throws Exception {
        String s3BucketName = "asdevify-ecommerce";

        String originalFileName = image.getOriginalFilename();
        String extension = "";

        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        // Generate safe unique file name
        String key = UUID.randomUUID().toString() + extension;

        try {
            s3Service.putObject(s3BucketName, key, image.getBytes());

            String imageUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", s3BucketName, awsRegion, key);

            productEntity.setImageUrl(imageUrl);
            return productRepo.save(productEntity);

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

}
