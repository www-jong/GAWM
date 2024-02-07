package com.cute.gawm.domain.lookbook.service;

import com.cute.gawm.common.exception.ClothesNotFoundException;
import com.cute.gawm.common.exception.TagNotFoundException;
import com.cute.gawm.common.exception.UserNotFoundException;
import com.cute.gawm.common.exception.UserNotMatchException;
import com.cute.gawm.common.response.PagingResponse;
import com.cute.gawm.common.util.s3.S3Uploader;
import com.cute.gawm.domain.clothes.dto.response.ClothesMiniResponse;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.repository.ClothesRepository;
import com.cute.gawm.domain.clothes_lookbook.entity.ClothesLookbook;
import com.cute.gawm.domain.clothes_lookbook.repository.ClothesLookbookRepository;
import com.cute.gawm.domain.comment.entity.Comment;
import com.cute.gawm.domain.comment.repository.CommentRepository;
import com.cute.gawm.domain.following.entity.Following;
import com.cute.gawm.domain.following.repository.FollowingRepository;
import com.cute.gawm.domain.lookbook.dto.request.LookbookCreateRequest;
import com.cute.gawm.domain.lookbook.dto.request.LookbookUpdateRequest;
import com.cute.gawm.domain.lookbook.dto.response.LookbookMiniResponse;
import com.cute.gawm.domain.lookbook.dto.response.LookbookResponse;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.lookbook.repository.LookbookRepository;
import com.cute.gawm.domain.lookbook_image.entity.LookbookImage;
import com.cute.gawm.domain.lookbook_image.repository.LookbookImageRepository;
import com.cute.gawm.domain.tag.entity.Tag;
import com.cute.gawm.domain.tag.repository.TagRepository;
import com.cute.gawm.domain.tag_lookbook.entity.TagLookbook;
import com.cute.gawm.domain.tag_lookbook.repository.TagLookbookRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class LookbookService {
    private final LookbookRepository lookbookRepository;
    private final CommentRepository commentRepository;
    private final S3Uploader s3Uploader;
    private final ClothesLookbookRepository clothesLookbookRepository;
    private final TagLookbookRepository tagLookbookRepository;
    private final LookbookImageRepository lookbookImageRepository;
    private final UserRepository userRepository;
    private final ClothesRepository clothesRepository;
    private final TagRepository tagRepository;

    private final FollowingRepository followingRepository;

    public LookbookResponse getLookbook(final int lookbookId){
        final Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        final List<ClothesLookbook> clotheLookbooks = clothesLookbookRepository.getAllByLookbookId(lookbookId);
        final List<TagLookbook> tagLookbooks = tagLookbookRepository.getAllByLookbookId(lookbookId);
        final List<Comment> comments = commentRepository.getAllByLookbookId(lookbookId);


        List<ClothesMiniResponse> miniResponses = new ArrayList<>();
        clotheLookbooks.forEach(clotheLookbook -> {
            final Clothes clothes = clotheLookbook.getClothes();
            final int id = clothes.getClothesId();
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


        return LookbookResponse.builder()
                .userId(lookbook.getUser().getUserId())
                .createdAt(lookbook.getCreatedAt())
                .clothes(miniResponses)
                .view(lookbook.getView())
                .tag(tags)
                .comment(comments)
                .build();
    }
    @Transactional
    public void createLookbook(Integer userId, List<MultipartFile> images, LookbookCreateRequest lookbookRequest){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("해당 유저가 존재하지 않습니다."));

        Lookbook lookbook = Lookbook.builder()
                .user(user)
                .view(0)
                .isPublic(lookbookRequest.isPublic())
                .build();
        lookbookRepository.save(lookbook);

        images.forEach(img -> {
               String name = s3Uploader.uploadFile(img);
               LookbookImage lookbookImage = LookbookImage.builder()
                       .image(name)
                       .lookbook(lookbook)
                       .build();
               lookbookImageRepository.save(lookbookImage);
        });

        lookbookRequest.getClothes().forEach(clotheId -> {
            ClothesLookbook clothesLookbook = ClothesLookbook.builder()
                    .lookbook(lookbook)
                    .clothes(clothesRepository.findById(clotheId).orElseThrow(() -> new ClothesNotFoundException("해당 옷이 존재하지 않습니다.")))
                    .build();

            clothesLookbookRepository.save(clothesLookbook);
        });

        lookbookRequest.getTags().forEach(tagName-> {
            Tag tag = Tag.builder()
                    .name(tagName)
                    .build();
            tagRepository.save(tag);

            TagLookbook tagLookbook = TagLookbook.builder()
                    .lookbook(lookbook)
                    .tag(tag)
                    .build();
            tagLookbookRepository.save(tagLookbook);
        });
    }

    public PagingResponse<List<LookbookMiniResponse>> getLookbooks(Pageable pageable){
        Page<Lookbook> lookbooks = lookbookRepository.findAllLookbook(pageable);
        List<LookbookMiniResponse> lookbookResponse = new ArrayList<>();

        lookbooks.forEach(lookbook -> {
            List<LookbookImage> lookbookImages = lookbookImageRepository.findAllByLookbook_LookbookId(lookbook.getLookbookId());
            List<String> images = new ArrayList<>();


            LookbookMiniResponse response = LookbookMiniResponse.builder()
                    .userId(lookbook.getUser().getUserId())
                    .images(lookbookImages)
                    .view(lookbook.getView())
                    .createdAt(lookbook.getCreatedAt())
                    .build();

            lookbookResponse.add(response);
        });

        return new PagingResponse(
                HttpStatus.OK.value(),
                lookbookResponse,
                lookbooks.isFirst(),
                lookbooks.isLast(),
                lookbooks.getPageable().getPageNumber(),
                lookbooks.getTotalPages(),
                lookbooks.getSize(),
                false,
                false,
                false
                );
    }
//TODO : 수정 테스트
    @Transactional
    public void updateLookbook(Integer userId, Integer lookbookId, List<MultipartFile> images, LookbookUpdateRequest lookbookUpdateRequest) throws UserNotMatchException {
        Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook.getUser().getUserId() != userId) throw new UserNotMatchException("해당 유저에게 룩북 수정 권한이 존재하지 않습니다.");

        if(!images.isEmpty()) {
            List<LookbookImage> lookbookImages = lookbookImageRepository.findAllByLookbook_LookbookId(lookbookId);
            lookbookImages.forEach( (lookbookImage) -> {
                s3Uploader.deleteFile(lookbookImage.getImage());
            });
            lookbookImageRepository.deleteByLookbook(lookbook);

            images.forEach((image) -> {
                String name = s3Uploader.uploadFile(image);
                LookbookImage lookbookImage = LookbookImage.builder()
                        .image(name)
                        .lookbook(lookbook)
                        .build();
                lookbookImageRepository.save(lookbookImage);
            });
        }

        if(!lookbookUpdateRequest.getClothes().isEmpty()) {
            clothesLookbookRepository.deleteAllByLookbook(lookbook);

            lookbookUpdateRequest.getClothes().forEach((clotheId)->{
                Clothes clothe = clothesRepository.findByClothesId(clotheId);
                ClothesLookbook clothesLookbook = ClothesLookbook.builder()
                        .lookbook(lookbook)
                        .clothes(clothe)
                        .build();
                clothesLookbookRepository.save(clothesLookbook);
            });
        }

        if(!lookbookUpdateRequest.getTags().isEmpty()){
            tagLookbookRepository.deleteByLookbookLookbookId(lookbookId);

            lookbookUpdateRequest.getTags().forEach(tagName ->{
                Tag tag = Tag.builder()
                        .name(tagName)
                        .build();
                tagRepository.save(tag);

                TagLookbook tagLookbook = TagLookbook.builder()
                        .tag(tag)
                        .lookbook(lookbook)
                        .build();

                tagLookbookRepository.save(tagLookbook);
            });
        }
    }

    @Transactional
    public void deleteLookbook(Integer userId, Integer lookbookId){
        Lookbook lookbook = lookbookRepository.findByLookbookId(lookbookId);
        if(lookbook.getUser().getUserId() != userId) throw new UserNotMatchException("해당 유저에게 룩북 삭제 권한이 존재하지 않습니다.");
        lookbookRepository.deleteByLookbookId(lookbookId);
    }

    public PageImpl<LookbookMiniResponse> getFollowingLookbooks(Integer userId, Pageable pageable){
        Following followingList = followingRepository.findByUserId(userId);
        List<LookbookMiniResponse> responseList = new ArrayList<>();

        followingList.getFollowingList().forEach(followingId -> {
            List<Lookbook> lookbooks = lookbookRepository.findByUserUserId(followingId);
            lookbooks.forEach(lookbook -> {
                List<LookbookImage> lookbookImages = lookbookImageRepository.findAllByLookbook_LookbookId(lookbook.getLookbookId());
                LookbookMiniResponse lookbookMiniResponse = LookbookMiniResponse.builder()
                        .images(lookbookImages)
                        .createdAt(lookbook.getCreatedAt())
                        .view(lookbook.getView())
                        .userId(lookbook.getUser().getUserId())
                        .build();
                responseList.add(lookbookMiniResponse);
            });
        });
        System.out.println(responseList);
        return new PageImpl<>(responseList, pageable, responseList.size());
    }



    public PageImpl<LookbookMiniResponse> getSearchLookbook(String keyword, Pageable pageable){
        PageImpl<Lookbook> lookbooks = lookbookRepository.searchLookbook(keyword, pageable);
        List<LookbookMiniResponse> responseList = new ArrayList<>();
        lookbooks.forEach(lookbook -> {
            List<LookbookImage> lookbookImage = lookbookImageRepository.findAllByLookbook_LookbookId(lookbook.getLookbookId());
            LookbookMiniResponse build = LookbookMiniResponse.builder()
                    .createdAt(lookbook.getCreatedAt())
                    .view(lookbook.getView())
                    .userId(lookbook.getUser().getUserId())
                    .images(lookbookImage)
                    .build();
            responseList.add(build);
        });

        return new PageImpl<>(responseList, pageable, responseList.size());
    }
}
