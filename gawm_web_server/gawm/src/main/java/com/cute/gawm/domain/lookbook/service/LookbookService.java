package com.cute.gawm.domain.lookbook.service;

import com.cute.gawm.domain.clothe.dto.response.ClotheMiniResponse;
import com.cute.gawm.domain.clothe.entity.ClotheDetail;
import com.cute.gawm.domain.clothe.repository.ClotheDetailRepository;
import com.cute.gawm.domain.clothe_lookbook.entity.ClotheLookbook;
import com.cute.gawm.domain.clothe_lookbook.repository.ClotheLookbookRepository;
import com.cute.gawm.domain.comment.entity.Comment;
import com.cute.gawm.domain.comment.repository.CommentRepository;
import com.cute.gawm.domain.lookbook.dto.response.LookbookResponse;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.lookbook.repository.LookbookRepository;
import com.cute.gawm.domain.tag.entity.Tag;
import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;
import com.cute.gawm.domain.tag_lookbook.repository.TagLookbookRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.cute.gawm.domain.clothe.entity.QClothe.clothe;

@Service
@AllArgsConstructor
public class LookbookService {
    private final LookbookRepository lookbookRepository;
    private final CommentRepository commentRepository;
    private final ClotheDetailRepository clotheDetailRepository;
    private final ClotheLookbookRepository clotheLookbookRepository;
    private final TagLookbookRepository tagLookbookRepository;
    public LookbookResponse getLookbook(final int lookbookId){
        final Lookbook lookbook = lookbookRepository.getByLookbookId(lookbookId);
        final List<ClotheLookbook> clotheLookbooks = clotheLookbookRepository.getAllByLookbookId(lookbookId);
        final List<TagLookbook> tagLookbooks = tagLookbookRepository.getAllByLookbookId(lookbookId);

        List<ClotheMiniResponse> miniResponses = new ArrayList<>();
        clotheLookbooks.forEach(clotheLookbook -> {
            final int clotheId = clotheLookbook.getClothe().getClotheId();
            final ClotheDetail clotheDetail = clotheDetailRepository.findByClotheId(clotheId);
            ClotheMiniResponse clotheMiniResp = ClotheMiniResponse.builder()
                    .clotheId(clotheId)
                    .name(clotheDetail.getName())
                    .brand(clotheDetail.getBrand())
                    .clotheImg(clotheLookbook.getClothe().getClotheImg())
                    .build();
            miniResponses.add(clotheMiniResp);
        });

        List<Tag> tags = new ArrayList<>();
        tagLookbooks.forEach(tag -> {
            tags.add(tag.getTag());
        });

        final List<Comment> comments = commentRepository.getCommentsByLookbook(lookbookId);

        return LookbookResponse.builder()
                .userId(lookbook.getUser().getUserId())
                .createdAt(lookbook.getCreatedAt())
                .clothes(miniResponses)
                .view(lookbook.getView())
                .tag(tags)
                .comment(comments)
                .build();
    }
}
