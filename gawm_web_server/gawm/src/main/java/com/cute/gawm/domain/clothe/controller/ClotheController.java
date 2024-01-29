package com.cute.gawm.domain.clothe.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.clothe.dto.ClotheCreateDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheInfoResponseDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheUpdateDTO;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.clothe.service.ClotheService;
import com.cute.gawm.domain.user.controller.UserController;
import com.cute.gawm.domain.user.dto.SessionUser;
import com.cute.gawm.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    public ResponseEntity<?> getClothes(@LoginUser SessionUser sessionUser) {
        try {
            Integer userId = sessionUser.getId();
            List<ClotheInfoResponseDTO> clothes = clotheService.getAllClothesInfo(userId);

            // 페이징 처리가 필요한 경우 여기서 처리하십시오.
            // 예시 코드는 모든 데이터를 반환하고, 페이징 정보는 하드코딩합니다.
            PagingResponse pagingResponse = new PagingResponse(
                    HttpStatus.OK.value(),
                    clothes,
                    true, // isFirst
                    true, // isLast
                    0, // page
                    1, // totalPage
                    clothes.size(), // size
                    false, // sorted
                    false, // asc
                    false // filtered
            );

            return ResponseEntity.ok(pagingResponse);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 처리 실패: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createClothe(
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") ClotheCreateDTO clotheCreateDTO,
            HttpServletRequest request
    ) {
        try {
            HttpSession session = request.getSession();
            SessionUser sessionUser = (SessionUser) session.getAttribute("user");
            if (sessionUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 인증이 필요합니다.");
            }
            Integer userId = sessionUser.getId();
            System.out.println("good");
            // 이미지 업로드
            String imageUrl = s3Uploader.uploadFile(image);
            clotheCreateDTO.setClotheImg(imageUrl); // 이미지 URL 설정
            System.out.println(userId);
            clotheService.createClothe(clotheCreateDTO, userId);

            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), new HashMap<>()));
        } catch (IOException e) {
            // 파일 업로드 실패 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + e.getMessage());
        } catch (Exception e) {
            // 기타 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 처리 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/{clotheId}")
    public ResponseEntity<?> deleteClothe(@PathVariable("clotheId") Integer clotheId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        SessionUser sessionUser = (SessionUser) session.getAttribute("user");
        if (sessionUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 인증이 필요합니다.");
        }
        Integer userId = sessionUser.getId();

        try {
            // 옷 삭제 서비스 호출
            boolean isDeleted = clotheService.deleteClothe(clotheId, userId);
            if (!isDeleted) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한이 없습니다.");
            }
            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), "옷이 성공적으로 삭제되었습니다."));
        } catch (Exception e) {
            // 기타 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 처리 실패: " + e.getMessage());
        }
    }


    @GetMapping("/{clotheId}")
    public ResponseEntity<?> getClotheInfo(@PathVariable Integer clotheId) {
        try {
            ClotheInfoResponseDTO clotheInfo = clotheService.getClotheInfo(clotheId);
            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), clotheInfo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 조회 실패: " + e.getMessage());
        }
    }

    /*
    @PatchMapping("/{clotheId}")
    public ResponseEntity<?> updateClothe(
            @PathVariable("clotheId") int clotheId,
            @RequestBody ClotheUpdateDTO clotheUpdateDTO,
            @LoginUser SessionUser sessionUser) {
        try {
            Integer userId = sessionUser.getId();
            // 옷 정보 조회 및 권한 확인

            // 서비스 레이어에 옷 정보 업데이트 요청
            clotheService.updateClothe(clotheId, clotheUpdateDTO, userId);

            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), "옷 정보가 업데이트되었습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 처리 실패: " + e.getMessage());
        }
    }


     */
}