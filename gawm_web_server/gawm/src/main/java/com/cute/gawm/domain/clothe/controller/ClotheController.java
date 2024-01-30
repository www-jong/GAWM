package com.cute.gawm.domain.clothe.controller;


import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.common.response.ErrorResponse;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.clothe.dto.ClotheCreateDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheInfoResponseDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheUpdateDTO;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.clothe.entity.ClotheDetail;
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

            //페이징 임시처리?
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"NotFoundException","데이터 처리 실패: " + e.getMessage()));
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

            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), "옷 생성 완료."));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"FileUploadException","파일 업로드 실패: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"DataProcessingException","데이터 처리 실패: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{clotheId}")
    public ResponseEntity<?> deleteClothe(@PathVariable("clotheId") Integer clotheId, HttpServletRequest request) {
        HttpSession session = request.getSession();
        SessionUser sessionUser = (SessionUser) session.getAttribute("user");
        if (sessionUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse( HttpStatus.UNAUTHORIZED.value(),"AuthenticationException","사용자 인증이 필요합니다."));
        }
        Integer userId = sessionUser.getId();

        try {
            // 옷 삭제 서비스 호출
            boolean isDeleted = clotheService.deleteClothe(clotheId, userId);
            if (!isDeleted) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse(HttpStatus.FORBIDDEN.value(),"NotFoundException", "옷을 찾을 수 없습니다."));
            }

            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), "옷이 성공적으로 삭제되었습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"DataProcessingException", "데이터 처리 실패: " + e.getMessage()));
        }
    }


    @GetMapping("/{clotheId}")
    public ResponseEntity<?> getClotheInfo(@PathVariable Integer clotheId) {
        try {
            ClotheInfoResponseDTO clotheInfo = clotheService.getClotheInfo(clotheId);
            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), clotheInfo));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"DataRetrievalException", "데이터 조회 실패: " + e.getMessage()));
        }
    }


    @PatchMapping("/{clotheId}")
    public ResponseEntity<?> updateClothe(
            @PathVariable("clotheId") int clotheId,
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") ClotheUpdateDTO clotheUpdateDTO,
            @LoginUser SessionUser sessionUser) {
        try {
            int userId = sessionUser.getId();
            clotheService.updateClothe(clotheId, image,clotheUpdateDTO, userId);

            return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), "옷 정보가 업데이트되었습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),"UpdateFailureException", "업데이트 처리 실패: " + e.getMessage()));
        }
    }

}