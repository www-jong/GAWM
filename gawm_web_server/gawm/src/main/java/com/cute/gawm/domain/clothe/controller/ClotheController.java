package com.cute.gawm.domain.clothe.controller;


import com.cute.gawm.domain.clothe.dto.ClotheCreateDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheInfoResponseDTO;
import com.cute.gawm.domain.clothe.entity.ClotheDetail;
import com.cute.gawm.domain.clothe.repository.ClotheDetailRepository;
import com.cute.gawm.domain.clothe.service.ClotheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/clothe")
public class ClotheController {
    private static class ResponseObject {
        private int status;
        private Object data;

        public ResponseObject(int status, Object data) {
            this.status = status;
            this.data = data;
        }

        // Getter와 Setter
    }
    @Autowired
    private ClotheService clotheService;
    @GetMapping("/list")
    public List<ClotheInfoResponseDTO> getClothes() {
        return clotheService.getAllClothes();
    }

    @PostMapping
    public ResponseEntity<?> createClothe(@RequestBody ClotheCreateDTO clotheCreateDTO, HttpServletRequest request) {
        String userId = request.getHeader("userId");
        System.out.println(userId);
        clotheService.createClothe(clotheCreateDTO,userId);
        System.out.println(clotheCreateDTO.getClotheImg());
        System.out.println(clotheCreateDTO.getMCategory());
        System.out.println(clotheCreateDTO.getSCategory());
        System.out.println(clotheCreateDTO.getColors());
        return new ResponseEntity<>(new ResponseObject(HttpStatus.OK.value(), new HashMap<>()), HttpStatus.OK);
    }
}