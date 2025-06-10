package com.asdevify.react_aws.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class GlobalController {

    @GetMapping("health")
    public String healthCheck() {
        return "Spring is running";
    }

}
