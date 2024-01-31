package com.cute.gawm.domain.clothes.service;

import com.cute.gawm.common.util.s3.S3Uploader;

import com.cute.gawm.domain.clothes.dto.request.ClothesCreateRequest;
import com.cute.gawm.domain.clothes.dto.response.ClothesInfoResponse;
import com.cute.gawm.domain.clothes.dto.request.ClothesUpdateResponse;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.entity.ClothesDetail;
import com.cute.gawm.domain.clothes.repository.ClothesDetailRepository;
import com.cute.gawm.domain.clothes.repository.ClothesRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClothesService {

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClothesRepository clothesRepository;

    @Autowired
    private ClothesDetailRepository clothesDetailRepository;


    // 유저의 모든 옷 조회(세션에서 유저 id로)
    public List<ClothesInfoResponse> getAllClothesInfo(Integer userId) {
        List<Clothes> clothesList = clothesRepository.findByUserUserId(userId);
        return clothesList.stream()
                .map(clothes -> new ClothesInfoResponse(clothes, clothesDetailRepository.findByClothesId(clothes.getClothesId())))
                .collect(Collectors.toList());
    }

    // 단일 옷 조회(옷 id로)
    public ClothesInfoResponse getClothesInfo(int clothesId) {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new RuntimeException("Clothes not found"));
        ClothesDetail clothesDetail = clothesDetailRepository.findByClothesId(clothesId);
        return new ClothesInfoResponse(clothes, clothesDetail);
    }

    // 옷 생성
    public void createClothes(ClothesCreateRequest clothesCreateRequest, Integer userId, MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            throw new RuntimeException("이미지가 없습니다.");
        }
        String imageName = s3Uploader.uploadFile(image);
        clothesCreateRequest.setClothesImg(imageName); // 업로드된 이미지 URL 설정
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        int lastOrder = clothesRepository.findLastOrderValueByUserId(userId);

        Clothes clothes = Clothes.builder()
                .user(user)
                .clothesImg(imageName)
                .orderNum(lastOrder + 1)
                .build();
        clothesRepository.save(clothes);

        ClothesDetail clothesDetail = ClothesDetail.builder()
                .clothesId(clothes.getClothesId())
                .mCategory(clothesCreateRequest.getMCategory())
                .sCategory(clothesCreateRequest.getSCategory())
                .brand(clothesCreateRequest.getBrand())
                .name(clothesCreateRequest.getName())
                .colors(clothesCreateRequest.getColors())
                .materials(clothesCreateRequest.getMaterials())
                .patterns(clothesCreateRequest.getPatterns())
                .build();
        clothesDetailRepository.save(clothesDetail);
    }

    // 옷 삭제
    public void deleteClothes(Integer clothesId, Integer userId) {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new RuntimeException("본인의 옷만 삭제할 수 있습니다."));
        if (clothes.getUser().getUserId() != userId) {
            throw new RuntimeException("본인의 옷만 삭제할 수 있습니다.");
        }
        clothesDetailRepository.deleteByClothesId(clothesId);
        clothesRepository.deleteById(clothesId);
    }

    // 옷 수정
    public void updateClothes(int clothesId, MultipartFile image, ClothesUpdateResponse clothesUpdateResponse, int userId) throws IOException {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new RuntimeException("옷을 찾을수 없습니다."));
        ClothesDetail clothesDetail = clothesDetailRepository.findByClothesId(clothesId);

        if (clothes.getUser().getUserId() != userId) {
            throw new RuntimeException("권한이 없습니다.");
        }
        if (!clothes.getClothesImg().equals(image.getOriginalFilename())) {
            boolean isDeleted = s3Uploader.deleteFile(clothes.getClothesImg());
            if (isDeleted && !image.isEmpty()) {
                String imageUrl = s3Uploader.uploadFile(image);
                clothes.setClothesImg(imageUrl);
            } else if (!isDeleted) {
                throw new RuntimeException("Failed to delete the existing image");
            }
        }
        clothesDetail.updateDetails(clothesUpdateResponse);
        clothesDetailRepository.save(clothesDetail);



    }


}
