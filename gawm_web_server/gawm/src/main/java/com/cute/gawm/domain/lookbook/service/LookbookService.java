package com.cute.gawm.domain.lookbook.service;

import com.cute.gawm.domain.clothes.dto.response.ClothesMiniResponse;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.entity.ClothesDetail;
import com.cute.gawm.domain.clothes.repository.ClothesDetailRepository;
import com.cute.gawm.domain.clothes_lookbook.entity.ClothesLookbook;
import com.cute.gawm.domain.clothes_lookbook.repository.ClothesLookbookRepository;
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


@Service
@AllArgsConstructor
public class LookbookService {
    private final LookbookRepository lookbookRepository;
    private final CommentRepository commentRepository;
    private final ClothesDetailRepository clotheDetailRepository;
    private final ClothesLookbookRepository clotheLookbookRepository;
    private final TagLookbookRepository tagLookbookRepository;
    public LookbookResponse getLookbook(final int lookbookId){
        final Lookbook lookbook = lookbookRepository.getByLookbookId(lookbookId);
        final List<ClothesLookbook> clotheLookbooks = clotheLookbookRepository.getAllByLookbookId(lookbookId);
        final List<TagLookbook> tagLookbooks = tagLookbookRepository.getAllByLookbookId(lookbookId);

        List<ClothesMiniResponse> miniResponses = new ArrayList<>();
        clotheLookbooks.forEach(clotheLookbook -> {
            final Clothes clothes = clotheLookbook.getClothes();
            final int id = clothes.getClothesId();
//            final ClothesDetail clotheDetail = clotheDetailRepository.findByClothesId(id);
            ClothesMiniResponse clotheMiniResp = ClothesMiniResponse.builder()
                    .clothesId(id)
                    .name(clothes.getName())
                    .brand(clothes.getBrand())
                    .clothesImg(clothes.getClothesImg())
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
