package com.cute.gawm.common.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Set;

@Configuration
public class MongoConfig {

    private final MongoTemplate mongoTemplate;

    public MongoConfig(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Bean
    CommandLineRunner commandLineRunner(MongoTemplate mongoTemplate) {
        return args -> {
            resetData();
        };
    }

    private void resetData() {
//        Set<String> collections = mongoTemplate.getCollectionNames();
//        for (String collection : collections) {
//            mongoTemplate.remove(new Query(), collection);
//        }
    }
}
