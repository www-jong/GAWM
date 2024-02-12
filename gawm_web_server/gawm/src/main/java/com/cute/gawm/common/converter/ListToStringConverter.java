package com.cute.gawm.common.converter;

import org.springframework.core.convert.converter.Converter;

import java.util.List;
import java.util.stream.Collectors;

public class ListToStringConverter implements Converter<List<String>, String> {
    @Override
    public String convert(List<String> source) {
        return source.stream().collect(Collectors.joining(", "));
    }
}