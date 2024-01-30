package com.cute.gawm.domain.stylelog.controller;


import com.cute.gawm.domain.stylelog.service.StylelogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stylelog")
public class StylelogController {

    @Autowired
    private StylelogService stylelogService;


}
