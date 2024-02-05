package com.cute.gawm.domain.clothe.controller;


import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.clothe.dto.ClotheCreateDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheInfoResponseDTO;
import com.cute.gawm.domain.clothe.service.ClotheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clothe")
public class ClotheController {

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private ClotheService clotheService;
    @GetMapping("/list")
    public List<ClotheInfoResponseDTO> getClothes() {
        return clotheService.getAllClothes();
    }

    /**
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
    */
    @PostMapping
    public ResponseEntity<?> createClothe (
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") ClotheCreateDTO clotheCreateDTO,
            HttpServletRequest request
    ) {
        try {
            System.out.println("good");
            // 이미지 업로드
            String imageUrl = s3Uploader.uploadFile(image);
            clotheCreateDTO.setClotheImg(imageUrl); // 이미지 URL 설정

            String userId = request.getHeader("userId");
            System.out.println(userId);

            clotheService.createClothe(clotheCreateDTO, userId);

            // 로깅
            //System.out.println(clotheCreateDTO.getClotheImg());
            //System.out.println(clotheCreateDTO.getMCategory());
            //System.out.println(clotheCreateDTO.getSCategory());
            //System.out.println(clotheCreateDTO.getColors());
            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), new HashMap<>()));
        } catch (IOException e) {
            // 파일 업로드 실패 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
        } catch (Exception e) {
            // 기타 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 처리 실패: " + e.getMessage());
        }
    }
}