package com.cute.gawm.config;

import com.cute.gawm.common.converter.ListToStringConverter;
import com.cute.gawm.common.converter.StringToListConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import java.util.Arrays;

@Configuration
public class MongoConfig {

    @Bean
    public MongoCustomConversions customConversions() {
        return new MongoCustomConversions(Arrays.asList(
                new ListToStringConverter(),
                new StringToListConverter()
        ));
    }
}
