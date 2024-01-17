package com.cute.hunbuhae;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@SpringBootApplication
public class HunbuhaeApplication {

	public static void main(String[] args) {
		SpringApplication.run(HunbuhaeApplication.class, args);
	}

}
