package com.zpi.teache;

import com.zpi.teache.Config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class TeacheApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeacheApplication.class, args);
	}

}
