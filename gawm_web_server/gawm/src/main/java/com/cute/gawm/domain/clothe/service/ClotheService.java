package com.cute.gawm.domain.clothe.service;

import com.cute.gawm.domain.clothe.dto.ClotheCreateDTO;
import com.cute.gawm.domain.clothe.dto.response.ClotheInfoResponseDTO;
import com.cute.gawm.domain.clothe.entity.Clothe;
import com.cute.gawm.domain.clothe.entity.ClotheDetail;
import com.cute.gawm.domain.clothe.repository.ClotheDetailRepository;
import com.cute.gawm.domain.clothe.repository.ClotheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClotheService {

    @Autowired
    private ClotheRepository clotheRepository;

    @Autowired
    private ClotheDetailRepository clotheDetailRepository;

    private ClotheInfoResponseDTO convertToClotheInfoResponseDTO(Clothe clothe){
        ClotheDetail clotheDetail = clotheDetailRepository.findByClotheId(clothe.getId());
        return new ClotheInfoResponseDTO();
    }
    public List<ClotheInfoResponseDTO> getAllClothes(){
        List<Clothe> clothes = clotheRepository.findAll();
        return clothes.stream().map(this::convertToClotheInfoResponseDTO).collect(Collectors.toList());
    }

    public void createClothe(ClotheCreateDTO clotheCreateDTO, String userId){
        //User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Clothe clothe = Clothe.builder()
                //.user(userId)
                .clotheImg(clotheCreateDTO.getClotheImg())
                .build();
        clothe = clotheRepository.save(clothe);

        ClotheDetail clotheDetail = ClotheDetail.builder()
                .clotheId(clothe.getId())
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
}
