package com.cute.gawm.domain.clothes.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.clothes.dto.request.ClothesCreateRequest;
import com.cute.gawm.domain.clothes.dto.response.ClothesInfoResponse;
import com.cute.gawm.domain.clothes.dto.request.ClothesUpdateResponse;
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
@RequestMapping("/clothes")
public class ClothesController {

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private ClothesService clothesService;

    // 옷 단일조회
    @GetMapping("/{clothesId}")
    public ResponseEntity<?> getClothesInfo(@PathVariable Integer clothesId) {
        try {
            ClothesInfoResponse clothesInfo = clothesService.getClothesInfo(clothesId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, clothesInfo);
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "DataRetrievalException", "데이터 조회 실패: " + e.getMessage());
        }
    }

    // 옷 전체 조회
    @GetMapping("/list")
    public ResponseEntity<?> getAllClothesInfo(@LoginUser SessionUser sessionUser) {
        try {
            Integer userId = sessionUser.getId();
            List<ClothesInfoResponse> clothes = clothesService.getAllClothesInfo(userId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, clothes);
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "NotFoundException", "데이터 처리 실패: " + e.getMessage());
        }
    }

    // 옷 생성
    @PostMapping
    public ResponseEntity<?> createClothes(
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") ClothesCreateRequest clothesCreateRequest,
            @LoginUser SessionUser sessionUser
    ) {
        try {
            Integer userId = sessionUser.getId();
            String imageName = s3Uploader.uploadFile(image);
            clothesCreateRequest.setClothesImg(imageName); // 이미지 URL 설정
            System.out.println(userId);
            clothesService.createClothes(clothesCreateRequest, userId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "옷 생성 완료.");
        } catch (IOException e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "FileUploadException", "파일 업로드 실패: " + e.getMessage());
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "DataProcessingException", "데이터 처리 실패: " + e.getMessage());
        }
    }

    // 옷 삭제
    @DeleteMapping("/{clothesId}")
    public ResponseEntity<?> deleteClothes(
            @PathVariable("clothesId") Integer clothesId,
            @LoginUser SessionUser sessionUser) {
        try {
            Integer userId = sessionUser.getId();
            clothesService.deleteClothes(clothesId, userId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "옷이 성공적으로 삭제되었습니다.");
        } catch (RuntimeException e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.FORBIDDEN, "NotFoundException", e.getMessage());
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "DataProcessingException", "데이터 처리 실패: " + e.getMessage());
        }
    }


    // 옷 수정
    @PatchMapping("/{clothesId}")
    public ResponseEntity<?> updateClothes(
            @PathVariable("clothesId") int clothesId,
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") ClothesUpdateResponse clothesUpdateResponse,
            @LoginUser SessionUser sessionUser) {
        try {
            int userId = sessionUser.getId();
            clothesService.updateClothes(clothesId, image, clothesUpdateResponse, userId);
            return ResponseUtil.buildBasicResponse(HttpStatus.OK, "옷 정보가 업데이트되었습니다.");
        } catch (Exception e) {
            return ResponseUtil.buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "UpdateFailureException", "업데이트 처리 실패: " + e.getMessage());
        }
    }

}