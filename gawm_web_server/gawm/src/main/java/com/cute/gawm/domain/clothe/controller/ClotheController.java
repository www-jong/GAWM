package com.cute.gawm.domain.clothe.controller;


import com.cute.gawm.domain.clothe.entity.ClotheDetail;
import com.cute.gawm.domain.clothe.repository.ClotheDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clothe")
public class ClotheController {

    @Autowired
    private ClotheDetailRepository clotheDetailRepository;

    @GetMapping("/list")
    public List<ClotheDetail> getClothes() {
        return clotheDetailRepository.findAll();
    }
}