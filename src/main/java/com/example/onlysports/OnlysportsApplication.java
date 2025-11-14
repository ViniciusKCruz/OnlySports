package com.example.onlysports;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.example.onlysports.model")
public class OnlysportsApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlysportsApplication.class, args);
	}

}
