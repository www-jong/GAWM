package com.cute.gawm.domain.live.controller;

import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.live.dto.request.LiveCreateRequest;
import com.cute.gawm.domain.live.entity.Live;
import com.cute.gawm.domain.live.service.LiveService;
import com.cute.gawm.domain.user.dto.SessionUser;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/live-room")
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

    @PostMapping
    public ResponseEntity<?> createLive(
            @LoginUser SessionUser sessionUser,
            @RequestBody LiveCreateRequest liveCreateRequest
    ){
        liveService.createLive(sessionUser.getId(), liveCreateRequest);
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "라이브 생성 완료");
    }

    @DeleteMapping("/{liveId}")
    public ResponseEntity<?> deleteLive(
            @LoginUser SessionUser sessionUser,
            @PathVariable Integer liveId
    ){
//        liveService.deleteLive(sessionUser.getId());
        return ResponseUtil.buildBasicResponse(HttpStatus.OK, "라이브 생성 완료");
    }


}
