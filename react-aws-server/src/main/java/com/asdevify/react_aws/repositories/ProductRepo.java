package com.asdevify.react_aws.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asdevify.react_aws.models.ProductEntity;

@Repository
public interface ProductRepo extends JpaRepository<ProductEntity, UUID> {

    Optional<ProductEntity> findByTitle(String title);

}
