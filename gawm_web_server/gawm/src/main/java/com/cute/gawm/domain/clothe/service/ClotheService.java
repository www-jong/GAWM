package com.cute.gawm.domain.clothe.service;

import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.clothe.dto.ClotheCreateDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheInfoResponseDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheUpdateDTO;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.clothe.entity.ClotheDetail;
import com.cute.gawm.domain.clothe.repository.ClotheDetailRepository;
import com.cute.gawm.domain.clothe.repository.ClotheRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClotheService {

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClotheRepository clotheRepository;

    @Autowired
    private ClotheDetailRepository clotheDetailRepository;


    // 유저의 모든 옷 조회(세션에서 유저 id로)
    public List<ClotheInfoResponseDTO> getAllClothesInfo(Integer userId) {
        List<Clothe> clothes = clotheRepository.findByUserUserId(userId);
        return clothes.stream()
                .map(this::convertToClotheInfoResponseDTO)
                .collect(Collectors.toList());
    }

    // 단일 옷 조회(옷 id로)
    public ClotheInfoResponseDTO getClotheInfo(int clotheId) {
        Clothe clothe = clotheRepository.findById(clotheId).orElseThrow(() -> new RuntimeException("Clothe not found"));
        ClotheDetail clotheDetail = clotheDetailRepository.findByClotheId(clotheId);
       return convertToClotheInfoResponseDTO(clothe);
    }

    private ClotheInfoResponseDTO convertToClotheInfoResponseDTO(Clothe clothe) {
        ClotheDetail clotheDetail = clotheDetailRepository.findByClotheId(clothe.getClotheId());
        // 여기에 ClotheInfoResponseDTO 객체 생성 로직 추가
        return new ClotheInfoResponseDTO(
                clothe.getClotheId(),
                clothe.getUser().getUserId(),
                clothe.getOrderNum(),
                clothe.getClotheImg(),
                clotheDetail.getMCategory(),
                clotheDetail.getSCategory(),
                clotheDetail.getBrand(),
                clotheDetail.getName(),
                clotheDetail.getColors(),
                clotheDetail.getMaterials(),
                clotheDetail.getPatterns()
        );
    }


    public void createClothe(ClotheCreateDTO clotheCreateDTO, Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        int lastOrder = clotheRepository.findLastOrderValueByUserId(userId);
        Clothe clothe = Clothe.builder()
                .user(user)
                .clotheImg(clotheCreateDTO.getClotheImg())
                .orderNum(lastOrder + 1) // 해당 회원의 옷 order중 가장 마지막에 + 1
                .build();
        clothe = clotheRepository.save(clothe);

        ClotheDetail clotheDetail = ClotheDetail.builder()
                .clotheId(clothe.getClotheId())
                //.userId(userId)
                .mCategory(clotheCreateDTO.getMCategory())
                .sCategory(clotheCreateDTO.getSCategory())
                .brand(clotheCreateDTO.getBrand())
                .name(clotheCreateDTO.getName())
                .colors(clotheCreateDTO.getColors())
                .materials(clotheCreateDTO.getMaterials())
                .patterns(clotheCreateDTO.getPatterns())
                .build();
        clotheDetailRepository.save(clotheDetail);
    }

    public boolean deleteClothe(Integer clotheId, Integer userId) {
        // clotheId와 userId를 사용하여 삭제 권한 확인 및 삭제 로직 구현
        Clothe clothe = clotheRepository.findById(clotheId).orElseThrow(() -> new RuntimeException("본인의 옷만 삭제할 수 있습니다."));
        if (clothe.getUser().getUserId() != userId) {
            return false;
        }
        clotheDetailRepository.deleteByClotheId(clotheId);
        clotheRepository.deleteById(clotheId);
        return true;
    }


    public void updateClothe(int clotheId, MultipartFile image, ClotheUpdateDTO clotheUpdateDTO, int userId) throws IOException {
        Clothe clothe = clotheRepository.findById(clotheId).orElseThrow(() -> new RuntimeException("옷을 찾을수 없습니다."));
        ClotheDetail clotheDetail = clotheDetailRepository.findByClotheId(clotheId);

        if (clothe.getUser().getUserId() != userId) {
            throw new RuntimeException("권한이 없습니다.");
        }
        if (!clothe.getClotheImg().equals(image.getOriginalFilename())) { // 기존 파일명과 다를경우(사진이 변경되었을 경우)
            if (s3Uploader.deleteFile(clothe.getClotheImg())) { //기존파일 삭제
                if(!image.isEmpty()) {
                    String imageUrl = s3Uploader.uploadFile(image);
                    clothe.setClotheImg(imageUrl);
                }
                else{ //이미지가 비어있을 경우,
                    clothe.setClotheImg(null);
                }
            } else {
                throw new RuntimeException("삭제에 실패했습니다.");
            }
        }
        clotheDetail.setMCategory(clotheUpdateDTO.getMCategory());
        clotheDetail.setSCategory(clotheUpdateDTO.getSCategory());
        clotheDetail.setBrand(clotheUpdateDTO.getBrand());
        clotheDetail.setName(clotheUpdateDTO.getName());
        clotheDetail.setColors(clotheUpdateDTO.getColors());
        clotheDetail.setMaterials(clotheUpdateDTO.getMaterials());
        clotheDetail.setPatterns(clotheUpdateDTO.getPatterns());


        // 데이터베이스에 업데이트
        clotheRepository.save(clothe);
        clotheDetailRepository.save(clotheDetail);

    }


}
