package com.cute.gawm.domain.comment.controller;

import com.cute.gawm.common.auth.LoginUser;
import com.cute.gawm.common.util.ResponseUtil;
import com.cute.gawm.domain.comment.dto.request.CommentRequest;
import com.cute.gawm.domain.comment.service.CommentService;
import com.cute.gawm.domain.user.dto.SessionUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/back/look-book")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{lookbookId}/comment")
    public ResponseEntity<?> createcomment(
            @LoginUser SessionUser seesionUser,
            @PathVariable("lookbookId") Integer lookbookId,
            @RequestBody CommentRequest commentRequest
    ) {
        final int userId = seesionUser.getId();
        commentService.createcomment(userId, lookbookId,commentRequest);
        return ResponseUtil.buildBasicResponse(
                HttpStatus.OK,
                "댓글 등록 완료"
        );
    }

    @PatchMapping("/{lookbookId}/{commentId}")
    public ResponseEntity<?> updatecomment(
            @LoginUser SessionUser seesionUser,
            @PathVariable("lookbookId") Integer lookbookId,
            @PathVariable("commentId") Integer commentId,
            @RequestBody CommentRequest commentRequest
    ) {
        final int userId = seesionUser.getId();
        commentService.updatecomment(userId, lookbookId,commentId,commentRequest);
        return ResponseUtil.buildBasicResponse(
                HttpStatus.OK,
                "댓글 수정 완료"
        );
    }

    @DeleteMapping("/{lookbookId}/{commentId}")
    public ResponseEntity<?> createcomment(
            @LoginUser SessionUser seesionUser,
            @PathVariable("lookbookId") Integer lookbookId,
            @PathVariable("commentId") Integer commentId
    ) {
        final int userId = seesionUser.getId();
        commentService.deletecomment(userId, lookbookId,commentId);
        return ResponseUtil.buildBasicResponse(
                HttpStatus.OK,
                "댓글 삭제 완료"
        );
    }
}
