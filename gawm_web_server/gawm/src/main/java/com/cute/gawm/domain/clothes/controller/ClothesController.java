package com.cute.gawm.domain.clothes.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.clothes.dto.request.ClothesCreateRequest;
import com.cute.gawm.domain.clothes.dto.response.ClothesInfoResponse;
import com.cute.gawm.domain.clothes.dto.request.ClothesUpdateRequest;
import com.cute.gawm.domain.clothes.service.ClothesService;
import com.cute.gawm.domain.user.dto.SessionUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/back/clothes")
public class ClothesController {

    @Autowired
    private ClothesService clothesService;

    // 옷 id로 조회
    @GetMapping("/{clothesId}")
    public ResponseEntity<?> getClothesInfo(@PathVariable int clothesId) {
        ClothesInfoResponse clothesInfo = clothesService.getClothesInfo(clothesId);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, clothesInfo);
    }

    // 옷 이름, 상위 카테고리로 조회
    @GetMapping("/search")
    public ResponseEntity<?> getClothesInfoBy(
            @RequestParam(value = "clothesname", required = false) String clothesName,
            @RequestParam(value = "mcategory", required = false) String clothesMCategory,
            @RequestParam(value = "nickname", required = false) String nickname,
            @RequestParam(value = "brand", required = false) String brand) {

        List<ClothesInfoResponse> clothesInfo = clothesService.getClothesInfoBy(clothesName, clothesMCategory, nickname, brand);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, clothesInfo);
    }


    // 옷 전체 조회
    @GetMapping("/list")
    public ResponseEntity<?> getAllClothesInfo(@LoginUser SessionUser sessionUser) {
            int userId = sessionUser.getId();
            List<ClothesInfoResponse> clothes = clothesService.getAllClothesInfo(userId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, clothes);
    }

    // 옷 생성
    @PostMapping
    public ResponseEntity<?> createClothes(
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") ClothesCreateRequest clothesCreateRequest,
            @LoginUser SessionUser sessionUser){
            int userId = sessionUser.getId();
            clothesService.createClothes(clothesCreateRequest, userId, image);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "옷 생성 완료.");
    }

    // 옷 삭제
    @DeleteMapping("/{clothesId}")
    public ResponseEntity<?> deleteClothes(
            @PathVariable("clothesId") int clothesId,
            @LoginUser SessionUser sessionUser) {
            int userId = sessionUser.getId();
            clothesService.deleteClothes(clothesId, userId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "옷이 성공적으로 삭제되었습니다.");
    }

    // 옷 수정
    @PatchMapping("/{clothesId}")
    public ResponseEntity<?> updateClothes(
            @PathVariable("clothesId") int clothesId,
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") ClothesUpdateRequest clothesUpdateRequest,
            @LoginUser SessionUser sessionUser) {
            int userId = sessionUser.getId();
            clothesService.updateClothes(clothesId, image, clothesUpdateRequest, userId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "옷 정보가 업데이트되었습니다.");
    }
}