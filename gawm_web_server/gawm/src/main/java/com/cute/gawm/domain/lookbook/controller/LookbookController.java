package com.cute.gawm.domain.lookbook.controller;

import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.domain.clothes.dto.request.ClothesCreateRequest;
import com.cute.gawm.domain.lookbook.dto.request.LookbookCreateRequest;
import com.cute.gawm.domain.lookbook.dto.response.LookbookResponse;
import com.cute.gawm.domain.lookbook.service.LookbookService;
import com.cute.gawm.domain.user.dto.SessionUser;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/look-book")
public class LookbookController {

    private final LookbookService lookbookService;

//    @GetMapping("/list")
//    public ResponseEntity<?> getLookbooks(){
//        return lookbookService.getLookbooks();
//    }

    @GetMapping("/{lookbookId}")
    public ResponseEntity<?> getLookbook(@PathVariable final int lookbookId){
        return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), lookbookService.getLookbook(lookbookId)));
    }

    @PostMapping
    public ResponseEntity<?> createLookbook(@LoginUser SessionUser sessionUser,
                                           @RequestPart("image") List<MultipartFile> images,
                                           @RequestPart("data") LookbookCreateRequest lookbookCreateRequest){
        final int userId = sessionUser.getId();
        lookbookService.createLookbook(userId, images, lookbookCreateRequest);
        return ResponseEntity.ok(new BasicResponse(HttpStatus.OK.value(), "룩북 생성 완료"));
    }

}
