package com.cute.gawm.common.healthcheck.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HealthCheckController {

    @GetMapping("/back/health-check")
    public String healthCheck(){
        return "Server Healthy";
    }
}
