package com.cute.gawm.domain.clothe.controller;


import com.cute.gawm.domain.clothe.document.ClotheMongo;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.clothe.repository.ClotheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clothe")
public class ClotheController {

    @Autowired
    private ClotheRepository clotheRepository;

    @GetMapping("/list")
    public List<ClotheMongo> getClothes() {
        return clotheRepository.findAll();
    }
}