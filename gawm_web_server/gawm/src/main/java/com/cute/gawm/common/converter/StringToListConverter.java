package com.cute.gawm.common.converter;


import org.springframework.core.convert.converter.Converter;

import java.util.Arrays;
import java.util.List;

public class StringToListConverter implements Converter<String, List<String>> {
    @Override
    public List<String> convert(String source) {
        return Arrays.asList(source.split(",\\s*"));
    }
}