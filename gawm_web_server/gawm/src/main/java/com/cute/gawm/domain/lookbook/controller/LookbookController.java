package com.cute.gawm.domain.lookbook.controller;

import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.response.BasicResponse;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.lookbook.dto.request.LookbookCreateRequest;
import com.cute.gawm.domain.lookbook.dto.request.LookbookUpdateRequest;
import com.cute.gawm.domain.lookbook.dto.response.LookbookMiniResponse;
import com.cute.gawm.domain.lookbook.dto.response.LookbookThumbnailResponse;
import com.cute.gawm.domain.lookbook.service.LookbookService;
import com.cute.gawm.domain.user.dto.SessionUser;
import com.nimbusds.oauth2.sdk.auth.SelfSignedTLSClientAuthentication;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/back/look-book")
public class LookbookController {
    private final int DEFAULT_SIZE = 10;
    private final LookbookService lookbookService;

    @GetMapping("/list")
    public ResponseEntity<?> getLookbooks(
            @PageableDefault(size = DEFAULT_SIZE, page = 0, sort = "createdAt") final Pageable pageable
    ){
        return ResponseEntity.ok(
                    lookbookService.getLookbooks(pageable)
            );
    }

    @GetMapping("/top_list")
    public ResponseEntity<?> getTopLookbookList(){
        List<LookbookThumbnailResponse> topLookbooks = lookbookService.getTopLookbooks();
        return ResponseUtil.buildBasicResponse(HttpStatus.OK,topLookbooks);
    }


    @GetMapping("/{lookbookId}")
    public ResponseEntity<?> getLookbook(@PathVariable final int lookbookId){
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, lookbookService.getLookbook(lookbookId));
    }

    @PostMapping()
    public ResponseEntity<?> createLookbook(@LoginUser SessionUser sessionUser,
                                            @RequestPart("image") List<MultipartFile> images,
                                            @RequestPart("data") LookbookCreateRequest lookbookCreateRequest){
        final int userId = sessionUser.getId();
        lookbookService.createLookbook(userId, images, lookbookCreateRequest);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "룩북 생성 완료");
    }

    @PutMapping("/{lookbookId}")
    public ResponseEntity<?> updateLookbook(
            @LoginUser SessionUser sessionUser,
            @PathVariable Integer lookbookId,
            @RequestPart("image") List<MultipartFile> images,
            @RequestPart("data") LookbookUpdateRequest lookbookUpdateRequest
    ) {
        final int userId = sessionUser.getId();
        lookbookService.updateLookbook(userId ,lookbookId, images, lookbookUpdateRequest);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "룩북 수정 완료");
    }

    @DeleteMapping("/{lookbookId}")
    public ResponseEntity<?> deleteLookbook(
            @LoginUser SessionUser sessionUser,
            @PathVariable Integer lookbookId
    ){
         final int userId = sessionUser.getId();
         lookbookService.deleteLookbook(userId, lookbookId);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "룩북 삭제 완료");
    }

    @GetMapping("/following/list")
    public ResponseEntity<PagingResponse> getFollowingLookbooks(
            @LoginUser SessionUser sessionUser,
            @PageableDefault(size = DEFAULT_SIZE, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) final Pageable pageable
    ){
        PageImpl<LookbookMiniResponse> followingLookbooks = lookbookService.getFollowingLookbooks(sessionUser.getId(), pageable);
        return ResponseUtil.buildPagingResponse(
                HttpStatus.OK,
                followingLookbooks.getContent(),
                followingLookbooks.isFirst(),
                followingLookbooks.isLast(),
                pageable.getPageNumber(),
                followingLookbooks.getTotalPages(),
                followingLookbooks.getSize(),
                true,
                false,
                false
        );
    }

    @GetMapping()
    public ResponseEntity<PagingResponse> getSearchLookbook(

            @RequestParam("search") String keyword,
            @PageableDefault(size = DEFAULT_SIZE, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) final Pageable pageable
    ){
        PageImpl<LookbookMiniResponse> lookbooks = lookbookService.getSearchLookbook(keyword, pageable);

        return ResponseUtil.buildPagingResponse(
                HttpStatus.OK,
                lookbooks.getContent(),
                lookbooks.isFirst(),
                lookbooks.isLast(),
                pageable.getPageNumber(),
                lookbooks.getTotalPages(),
                lookbooks.getSize(),
                true,
                false,
                false

        );
    }

    @PostMapping("/{lookbookId}/bookmark")
    public ResponseEntity<?> bookmark(
            @LoginUser SessionUser seesionUser,
            @PathVariable("lookbookId") Integer lookbookId
    ){
        final int userId = seesionUser.getId();
        lookbookService.bookmark(userId, lookbookId);

        return ResponseUtil.buildBasicResponse(
                HttpStatus.OK,
                "북마크 완료"
        );
    }

    @PostMapping("/{lookbookId}/unbookmark")
    public ResponseEntity<?> unbookmark(
            @LoginUser SessionUser seesionUser,
            @PathVariable("lookbookId") Integer lookbookId
    ){
        final int userId = seesionUser.getId();
        lookbookService.unbookmark(userId, lookbookId);
        return ResponseUtil.buildBasicResponse(
                HttpStatus.OK,
                "북마크 완료"
        );
    }

    @PostMapping("/{lookbookId}/likes")
    public ResponseEntity<?> likes(
            @LoginUser SessionUser seesionUser,
            @PathVariable("lookbookId") Integer lookbookId
    ){
        final int userId = seesionUser.getId();
        lookbookService.likes(userId, lookbookId);
        return ResponseUtil.buildBasicResponse(
                HttpStatus.OK,
                "감있어요 완료"
        );
    }

    @PostMapping("/{lookbookId}/unlikes")
    public ResponseEntity<?> unlikes(
            @LoginUser SessionUser seesionUser,
            @PathVariable("lookbookId") Integer lookbookId
    ){
        final int userId = seesionUser.getId();
        lookbookService.unlikes(userId, lookbookId);
        return ResponseUtil.buildBasicResponse(
                HttpStatus.OK,
                "감있어요 취소 완료"
        );
    }


}
