package com.cute.gawm.domain.comment.service;

import com.cute.gawm.common.exception.DataNotFoundException;
import com.cute.gawm.common.exception.UserNotFoundException;
import com.cute.gawm.common.exception.UserNotMatchException;
import com.cute.gawm.domain.comment.dto.request.CommentRequest;
import com.cute.gawm.domain.comment.entity.Comment;
import com.cute.gawm.domain.comment.repository.CommentRepository;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.lookbook.repository.LookbookRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final UserRepository userRepository;
    private final LookbookRepository lookbookRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public void createcomment(int userId, Integer lookbookId, CommentRequest commentRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
        Lookbook lookbook=lookbookRepository.findByLookbookId(lookbookId);

        Comment comment = Comment.builder()
                .content(commentRequest.getContent())
                .user(user)
                .lookbook(lookbook).build();
        commentRepository.save(comment);

        user.addPoint(5);
        userRepository.save(user);
        User author=lookbook.getUser();
        author.addPoint(10);
        userRepository.save(author);
    }

    @Transactional
    public void updatecomment(int userId, Integer lookbookId, Integer commentId, CommentRequest commentRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
        Comment comment= commentRepository.findByCommentId(commentId);
        if(comment==null) throw new DataNotFoundException("해당 댓글이 존재하지 않습니다.");
        if(comment.getUser().getUserId()!=userId) throw new UserNotMatchException("해당 유저에게 댓글 수정 권한이 존재하지 않습니다.");
        Lookbook lookbook=lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 댓글의 룩북이 존재하지 않습니다.");
        comment.updateContent(commentRequest.getContent());
        commentRepository.save(comment);
    }

    @Transactional
    public void deletecomment(int userId, Integer lookbookId, Integer commentId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));
        Comment comment= commentRepository.findByCommentId(commentId);
        if(comment==null) throw new DataNotFoundException("해당 댓글이 존재하지 않습니다.");
        if(comment.getUser().getUserId()!=userId) throw new UserNotMatchException("해당 유저에게 댓글 삭제 권한이 존재하지 않습니다.");
        Lookbook lookbook=lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook==null) throw new DataNotFoundException("해당 댓글의 룩북이 존재하지 않습니다.");

        user.minusPoint(5);
        userRepository.save(user);
        User author=lookbook.getUser();
        author.minusPoint(10);
        userRepository.save(author);

        commentRepository.deleteByCommentId(commentId);
    }
}
