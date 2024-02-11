package com.cute.gawm.domain.live.controller;

import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.clothes.dto.response.ClothesInfoResponse;
import com.cute.gawm.domain.live.dto.request.LiveCreateRequest;
import com.cute.gawm.domain.live.entity.Live;
import com.cute.gawm.domain.live.service.LiveService;
import com.cute.gawm.domain.user.dto.SessionUser;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/back/live-room")
@AllArgsConstructor
public class LiveController {
    private final LiveService liveService;
    private final int DEFAULT_SIZE=10;
    @GetMapping("/follow")
    public ResponseEntity<?> getFollowingLive(
            @LoginUser SessionUser sessionUser,
            @PageableDefault(size = DEFAULT_SIZE, page = 0, sort = "createdAt", direction = Sort.Direction.DESC) final Pageable pageable
    ){
        PageImpl<Live> followingLive = liveService.getFollowingLive(sessionUser.getId(), pageable);
        return ResponseUtil.buildPagingResponse(
                HttpStatus.OK,
                followingLive.getContent(),
                followingLive.isFirst(),
                followingLive.isLast(),
                pageable.getPageNumber(),
                followingLive.getTotalPages(),
                followingLive.getSize(),
                true,
                true,
                false
        );
    }

    @DeleteMapping("/{liveId}")
    public ResponseEntity<?> deleteLive(
            @LoginUser SessionUser sessionUser,
            @PathVariable Integer liveId
    ){
        liveService.deleteLive(sessionUser.getId(), liveId);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "라이브 삭제 완료");
    }

    @GetMapping("/closet/{liveId}")
    public ResponseEntity<?> getLiveCloset(
            @PathVariable Integer liveId
    ){
        List<ClothesInfoResponse> closet = liveService.getLiveUserAllCloset(liveId);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, closet);

    }
}
