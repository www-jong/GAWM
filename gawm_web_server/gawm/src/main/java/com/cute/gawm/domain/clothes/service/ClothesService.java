package com.cute.gawm.domain.clothes.service;

import com.cute.gawm.common.exception.ClothesNotFoundException;
import com.cute.gawm.common.exception.S3FileDeleteException;
import com.cute.gawm.common.exception.UserNotFoundException;
import com.cute.gawm.common.util.s3.S3Uploader;

import com.cute.gawm.domain.clothes.dto.request.ClothesCreateRequest;
import com.cute.gawm.domain.clothes.dto.response.ClothesInfoResponse;
import com.cute.gawm.domain.clothes.dto.request.ClothesUpdateRequest;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.entity.ClothesDetail;
import com.cute.gawm.domain.clothes.repository.ClothesDetailRepository;
import com.cute.gawm.domain.clothes.repository.ClothesRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClothesService {

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClothesRepository clothesRepository;

    @Autowired
    private ClothesDetailRepository clothesDetailRepository;

    // 옷 생성
    public void createClothes(ClothesCreateRequest clothesCreateRequest, int userId, MultipartFile image) {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("이미지가 없습니다.");
        }
        String imageName = s3Uploader.uploadFile(image);
        clothesCreateRequest.setClothesImg(imageName);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다. :"+userId));
        int lastOrder = clothesRepository.findLastOrderValueByUserId(userId);

        Clothes clothes = Clothes.builder()
                .user(user)
                .clothesImg(imageName)
                .brand(clothesCreateRequest.getBrand())
                .orderNum(lastOrder + 1)
                .mCategory(clothesCreateRequest.getMCategory())
                .name(clothesCreateRequest.getName())
                .build();
        clothesRepository.save(clothes);

        ClothesDetail clothesDetail = ClothesDetail.builder()
                .clothesId(clothes.getClothesId())
                .colors(clothesCreateRequest.getColors())
                .sCategory(clothesCreateRequest.getSCategory())
                .materials(clothesCreateRequest.getMaterials())
                .patterns(clothesCreateRequest.getPatterns())
                .build();
        clothesDetailRepository.save(clothesDetail);
    }

    // 유저의 모든 옷 조회(세션에서 유저 id로)
    @Transactional(readOnly = true)
    public List<ClothesInfoResponse> getAllClothesInfo(int userId) {
        List<Clothes> clothesList = clothesRepository.findByUserUserId(userId);
        return clothesList.stream()
                .map(clothes -> new ClothesInfoResponse(clothes, clothesDetailRepository.findByClothesId(clothes.getClothesId())))
                .collect(Collectors.toList());
    }

    //옵셔널 조회(clothesName, mCategory, nickname으로 조회
    @Transactional(readOnly = true)
    public List<ClothesInfoResponse> getClothesInfoBy(String name, String mCategory, String nickname, String brand) {
        Integer userId = null; //쿼리검색시 null처리를 위해 Integer로 진행
        System.out.println("닉네임 :"+nickname);
        if (nickname != null) {
            Optional<User> user = userRepository.findByNickname(nickname);
            if (!user.isPresent()) {
                return Collections.emptyList();
            }
            userId = user.get().getUserId();
        }
        List<Clothes> clothesList = clothesRepository.findByCriteria(name, mCategory, userId, brand);
        return clothesList.stream()
                .map(clothes -> getClothesInfo(clothes.getClothesId()))
                .collect(Collectors.toList());
    }

    // 단일 옷 조회(옷 id로)
    @Transactional(readOnly = true)
    public ClothesInfoResponse getClothesInfo(int clothesId) {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new ClothesNotFoundException("존재하지 않는 clothesId입니다. : "+clothesId));
        ClothesDetail clothesDetail = clothesDetailRepository.findByClothesId(clothesId);
        return new ClothesInfoResponse(clothes, clothesDetail);
    }

    // 옷 삭제
    public void deleteClothes(int clothesId, int userId) {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new ClothesNotFoundException("존재하지 않는 clothesId입니다. : "+clothesId));
        if (clothes.getUser().getUserId() != userId) {
            throw new AccessDeniedException("본인의 옷만 삭제할 수 있습니다.");
        }
        clothesDetailRepository.deleteByClothesId(clothesId);
        clothesRepository.deleteById(clothesId);
    }

    // 옷 수정
    @Transactional
    public void updateClothes(int clothesId, MultipartFile image, ClothesUpdateRequest clothesUpdateRequest, int userId) {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new ClothesNotFoundException("존재하지 않는 clothesId입니다. : "+clothesId));
        ClothesDetail clothesDetail = clothesDetailRepository.findByClothesId(clothesId);

        if (clothes.getUser().getUserId() != userId) {
            throw new AccessDeniedException("본인의 옷만 수정할 수 있습니다.");
        }
        if (!clothes.getClothesImg().equals(image.getOriginalFilename())) {
            boolean isDeleted = s3Uploader.deleteFile(clothes.getClothesImg());
            if (isDeleted && !image.isEmpty()) {
                String imageUrl = s3Uploader.uploadFile(image);
                clothes.setClothesImg(imageUrl);
            } else if (!isDeleted) {
                throw new S3FileDeleteException("이미지 삭제에 실패했습니다.");
            }
        }
        // 여기서 더티체킹 처리됨
        if (!clothes.getMCategory().equals(clothesUpdateRequest.getMCategory())) {
            clothes.setMCategory(clothesUpdateRequest.getMCategory());
        }
        if (!clothes.getName().equals(clothesUpdateRequest.getName())) {
            clothes.setName(clothesUpdateRequest.getName());
        }
        if (!clothes.getBrand().equals(clothesUpdateRequest.getBrand())) {
            clothes.setBrand(clothesUpdateRequest.getBrand());
        }
        clothesDetail.updateDetails(clothesUpdateRequest);
        clothesDetailRepository.save(clothesDetail);
    }
}
