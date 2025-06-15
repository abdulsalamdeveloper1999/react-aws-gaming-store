package com.asdevify.react_aws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.asdevify.react_aws.repositories")
public class ReactAwsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReactAwsApplication.class, args);
	}

}
