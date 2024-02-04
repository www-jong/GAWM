package com.cute.gawm.common.auth;

import com.cute.gawm.common.exception.DataNotFoundException;
import com.cute.gawm.domain.bookmark.repository.BookmarkRepository;
import com.cute.gawm.domain.clothes.entity.Clothes;
import com.cute.gawm.domain.clothes.repository.ClothesDetailRepository;
import com.cute.gawm.domain.clothes.repository.ClothesRepository;
import com.cute.gawm.domain.clothes_stylelog.entity.ClothesStylelog;
import com.cute.gawm.domain.clothes_stylelog.repository.ClothesStylelogRepository;
import com.cute.gawm.domain.comment.repository.CommentRepository;
import com.cute.gawm.domain.lookbook.entity.Lookbook;
import com.cute.gawm.domain.lookbook.repository.LookbookRepository;
import com.cute.gawm.domain.stylelog.entity.Stylelog;
import com.cute.gawm.domain.stylelog.repository.StylelogRepository;
import com.cute.gawm.domain.tag_lookbook.repository.TagLookbookRepository;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class RevokeService {
    private final UserRepository userRepository;
    private final StylelogRepository stylelogRepository;
    private final ClothesStylelogRepository clothesStylelogRepository;
    private final ClothesRepository clothesRepository;
    private final ClothesDetailRepository clothesDetailRepository;
    private final TagLookbookRepository tagLookbookRepository;
    private final CommentRepository commentRepository;
    private final BookmarkRepository bookmarkRepository;
    private final LookbookRepository lookbookRepository;

    @Transactional
    public void deleteGoogleAccount(Integer sessionUserId, OAuth2AuthorizedClient oAuth2AuthorizedClient) {
        Optional<User> user = userRepository.findById(sessionUserId);
        if (!user.isPresent()) {
            throw new DataNotFoundException("해당 유저가 존재하지 않습니다");
        }
        // 1. 세션 삭제
        deleteSession();
        // 2. 토큰 만료
        String data = "token=" + oAuth2AuthorizedClient.getAccessToken().getTokenValue();
        sendRevokeRequest(data, "google", null);
        // 3. 관련 엔티티 삭제
        deleteRelatedEntities(sessionUserId);
        // 4. 유저 엔티티 삭제
        deleteUserAccount(user.get());
    }

    @Transactional
    public void deleteKakaoAccount(Integer sessionUserId, OAuth2AuthorizedClient oAuth2AuthorizedClient) {
        Optional<User> user = userRepository.findById(sessionUserId);
        if (!user.isPresent()) {
            throw new DataNotFoundException("해당 유저가 존재하지 않습니다");
        }
        // 1. 세션 삭제
        deleteSession();
        // 2. 토큰 만료
        sendRevokeRequest(null, "kakao", oAuth2AuthorizedClient.getAccessToken().getTokenValue());
        // 3. 관련 엔티티 삭제
        deleteRelatedEntities(sessionUserId);
        // 4. 유저 엔티티 삭제
        deleteUserAccount(user.get());
    }
    @Transactional
    public void deleteSession() {
        SecurityContextHolder.clearContext();
    }

    @Transactional
    public void deleteUserAccount(User user) {
        userRepository.delete(user);
    }

    private void sendRevokeRequest(String data, String provider, String accessToken) {
        String googleRevokeUrl = "https://accounts.google.com/o/oauth2/revoke";
        String kakaoRevokeUrl = "https://kapi.kakao.com/v1/user/unlink";

        RestTemplate restTemplate = new RestTemplate();
        String revokeUrl = "";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> entity = new HttpEntity<>(data, headers);

        switch (provider) {
            case "google":
                revokeUrl = googleRevokeUrl;
                break;
            case "kakao":
                revokeUrl = kakaoRevokeUrl;
                headers.setBearerAuth(accessToken);
                break;
        }

        ResponseEntity<String> responseEntity = restTemplate.exchange(revokeUrl, HttpMethod.POST, entity, String.class);

        // Get the response status code and body
        HttpStatus statusCode = (HttpStatus) responseEntity.getStatusCode();
        String responseBody = responseEntity.getBody();

        log.info("statusCode={}",statusCode);
        log.info("responseBody={}",responseBody);
    }

    @Transactional
    public void deleteRelatedEntities(Integer sessionUserId) {

        List<Stylelog> stylelogList = stylelogRepository.findByUserUserId(sessionUserId);
        for (Stylelog stylelog : stylelogList) {
            clothesStylelogRepository.deleteByStylelog_StylelogId(stylelog.getStylelogId()); //clothesStylelog 삭제
        }
        stylelogRepository.deleteByUserUserId(sessionUserId); //stylelog삭제

        List<Clothes> clothesList = clothesRepository.findByUserUserId(sessionUserId);
        for (Clothes clothes : clothesList) {
            clothesDetailRepository.deleteByClothesId(clothes.getClothesId()); //clothesDetail 삭제
        }
        clothesRepository.deleteByUserUserId(sessionUserId);//clothes 삭제

        List<Lookbook> lookbookList = lookbookRepository.findByUserUserId(sessionUserId);
        for (Lookbook lookbook : lookbookList) {
            tagLookbookRepository.deleteByLookbookLookbookId(lookbook.getLookbookId()); //Tag-Lookbook 삭제
            commentRepository.deleteByLookbookLookbookId(lookbook.getLookbookId()); //comment 삭제
            bookmarkRepository.deleteByLookbookLookbookId(lookbook.getLookbookId()); //bookmark 삭제
        }
        lookbookRepository.deleteByUser_UserId(sessionUserId); //lookbook 삭제
    }

}
