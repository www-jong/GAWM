package com.cute.gawm.common.auth;

import com.cute.gawm.common.auth.OAuthAttributes;
import com.cute.gawm.domain.following.entity.Follower;
import com.cute.gawm.domain.following.entity.Following;
import com.cute.gawm.domain.following.repository.FollowerRepository;
import com.cute.gawm.domain.following.repository.FollowingRepository;
import com.cute.gawm.domain.following.service.FollowService;
import com.cute.gawm.domain.user.dto.SessionUser;
import com.cute.gawm.domain.user.entity.User;
import com.cute.gawm.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final FollowingRepository followingRepository;
    private final FollowerRepository followerRepository;
    private final FollowService followService;
    private final HttpSession httpSession;

    private static final String[] adjectives = {"행복한", "신비로운", "용감한", "밝은", "창의적인", "은은한", "빛나는", "찬란한", "화려한", "아름다운", "신나는", "활기찬", "신선한", "신스틸", "브리검스", "우아한", "도전적인", "자유로운", "유려한", "감각적인", "유니크한", "엘리강트한", "세련된", "생동감", "있는", "모던한", "캐릭터스틱한", "황홀한", "매혹적인", "트렌디한", "현란한", "고요한", "자유분방한", "당당한", "정열적인", "심플한", "힙한", "섬세한", "우월한", "매끄러운", "편안한", "파워풀한", "몽환적인", "다이내믹한", "자기주장하는", "이국적인", "힐링되는", "흥미로운", "파란만장한", "신사적인", "유쾌한", "고상한", "감각있는", "에너제틱한", "희망찬", "맑은", "달콤한", "소나기처럼", "자연스러운", "싱그러운", "로맨틱한", "유순한", "터프한", "새로운", "차가운", "강렬한", "산뜻한", "영롱한", "풍부한", "활발한", "환상적인", "발랄한", "사랑스러운", "기발한", "쾌활한", "화사한", "귀여운", "눈부신", "차분한", "빈티지한", "소박한", "성숙한", "따뜻한", "실버", "촉촉한", "담백한", "애절한", "특별한", "묵직한", "경쾌한", "튼튼한", "민감한", "실용적인", "무뚝뚝한", "듬직한", "편리한", "자연적인", "명랑한", "단아한", "부드러운", "젠틀한", "특이한", "기민한", "효율적인", "손쉬운", "차려입은", "독특한", "진중한", "온화한", "뜨거운", "즐거운", "푸른", "젊은", "즐겁게", "웃는", "청량한", "감동적인", "신뢰감", "안정된", "부드럽게", "흐르는", "활력찬", "굳건한", "긍정적인", "유연한", "명쾌한", "순수한", "자신감", "자연력", "탄탄한", "생기", "친화적인", "길게", "이어진", "높은", "깔끔한", "진한", "생생한", "자발적인", "과감한", "대담한", "성실한", "민첩한", "투명한", "디자인", "감각", "자립한", "참신한", "예민한", "자주", "떠도는", "개성", "정확한", "조화로운", "명석한", "확고한", "빠른", "변화무쌍한", "매력적인", "철학적인", "독립적인", "체계적인", "균형", "잡힌", "침착한", "동적인", "힘찬", "천진난만한", "정성스런", "색다른", "영리한", "상큼한", "신비한", "정갈한", "럭셔리한", "훌륭한", "자극적인", "자신만만한", "신선하게", "피는", "신속한", "넘치는", "자연스런", "혁신적인", "신뢰할", "청명한", "청순한", "역동적인", "프레시한", "클래식한", "아기자기한", "톡톡", "튀는", "캐주얼한", "미소", "짓는", "열정적인", "향기로운", "우스꽝스러운", "선명한", "자세한", "흥겨운", "사려", "깊은", "소란스러운", "신데렐라", "같은", "똑똑한", "우울한", "낙천적인", "자아", "강한", "신중한", "부드럽고", "고운", "흐린", "웅장한", "운동적인", "건강한", "도도한", "다정한", "모험적인", "무한한", "적극적인", "감성적인", "귀환자", "낭만적인", "유머러스한", "업데이트된", "스타일리시한", "현대적인", "휴양지같은", "카리스마", "판타스틱", "근사한", "흐름있는", "러블리한", "새로워진", "미소짓는", "끈기있는", "예쁜", "드레스업된", "채움의", "포근한"};
    private static final String[] nouns = {"모험가", "여행자", "탐험가", "드래곤", "용사", "마법사", "히어로", "전사", "마법", "생물", "미스틱", "은하수", "별빛", "선원", "해적", "무적", "피닉스", "신비", "유령", "황금", "은화", "불꽃", "천재", "폭풍", "스카이", "호랑이", "반딧불이", "평화", "꽃", "음악", "기술자", "레전드", "태양", "달", "바다", "산", "바람", "환생", "파도", "우주", "지식", "여우", "거북", "강림", "새벽", "저녁", "노을", "신령", "단풍", "눈송이", "바이러스", "로봇", "인공지능", "레이저", "자이언트", "마시멜로", "초콜릿", "비밀", "사랑", "우정", "증강현실", "가상현실", "로켓", "산타", "감자", "라이언", "라디오", "터보", "에너지", "닌자", "사무라이", "무릎", "코끼리", "쥐", "얼음", "심해", "별똥별", "물고기", "타임머신", "로맨스", "고양이", "강아지", "토끼", "곰", "햇볕", "달빛", "얼룩말", "코뿔소", "사자", "힙합", "스노우", "키스", "버터플라이", "차우덕", "갈매기", "신호등", "병아리", "해물", "공룡", "우유", "미래", "태양계", "비밀정원", "꿈나라", "레이저빔", "도전자", "불멸자", "암호", "유니버스", "포켓몬", "트로피", "챔피언", "소녀", "화성", "나비효과", "터널", "엽서", "디지털", "메타버스", "프로젝트", "모노키니", "시간여행", "블리자드", "썬더", "이그제큐터", "엑소스켈레톤", "크리스털", "신선한", "공기", "레모네이드", "목소리", "차원이동", "푸른", "하늘", "전투", "불꽃놀이", "산타모자", "스페이스", "다이아몬드", "쿠키몬스터", "라디오파", "디자이너", "미소녀", "사이버펑크", "히어로즈", "마법검", "코끼리상어", "파티쉐", "나들이", "왕국", "산성비", "여신", "얼음공주", "로켓맨", "초콜릿퐁듀", "사탕왕국", "스타벅스", "버블티", "인디언", "서핑강사", "타임캡슐", "문", "축제", "스트레스", "해소", "꽃신", "꽃바람", "공항", "허리케인", "황금빛", "마법램프", "고리", "프리즘", "썸머", "알", "신의", "손", "호수", "인공위성", "우주선", "카페라떼", "아이언맨", "라이딩", "인디고", "티라노사우루스", "메뚜기", "신화", "오로라", "헤이즐넛", "트랙스", "네온사인", "레전드히어로", "화이트티거", "갈매기떼", "블랙홀", "별자리", "버디", "동티모르", "하바나", "아이스크림", "힙합스타", "노르딕", "라이언왕", "카멜레온", "오로라비둘기", "은하수소", "사파이어", "에메랄드", "루비", "창의력", "슈퍼노바", "화려한", "마스크", "로봇공학자", "미스터리", "스릴러", "밀레니엄", "선물", "스파크", "블루버드", "썬셋", "레이저펜", "알파카", "캐롤", "모래성", "초원", "우주쓰레기", "눈꽃", "화이트", "크리스마스", "로봇피자", "미라클", "어벤져스", "고래", "토끼귀신", "기계", "동물", "선인장", "새벽햇살", "신", "에코", "시스템", "오션뷰", "무릎놀이", "천사", "날개", "우주소년", "불꽃놀이쇼", "화가", "동굴", "나침반", "로맨틱", "서커스", "분수", "무한루프", "감성소년", "흑룡", "감성피아노", "크레센도", "스피라클", "피닉싱", "크레오라", "코마도", "래플라코", "쟈스키", "테라바이트", "네온블루", "키스틸러", "오션스피릿", "실버콘", "리메인", "클라우디안", "판타스틱", "메가트론", "오로라스카이", "하이퍼보틀", "바이올렛선셋", "실버웨이브", "블랙썬더", "크리스탈라이즈", "판타지코스모", "크리미단", "썬쉬머", "스파크로우", "홀로그램바다", "블루샤크", "스카이헤이즈", "미러볼라이트", "퍼플라이트닝", "선셋스플래쉬", "블레이징스카이", "실버샤도우", "모션웨이브", "엘리트코더", "헬로우트리", "러블리라이언", "울트라세피아", "크로노스피어", "로맨틱비치", "블루퍼스트", "써니하모니", "헤븐브라이트", "크레이지나잇", "에클립스라이트", "프로스트블루", "파라다이스뷰", "터보스피릿", "황금메이즈", "오픈마인드", "스톰쿠드", "선셋로드", "콘트리스톰", "크림슨아이", "블루호라이즌", "클리어세일", "피렌체스카이", "로열블루", "모카라떼", "브라이트선셋", "스트롬블루", "매직트릭스", "라임스플래쉬", "에메랄드라이트", "미스티크레이", "실버파워", "리틀유니버스", "퍼플로즈", "헤이즐라이트", "피스풀스카이", "에이플레어", "라임플라츠", "스톤브레이즈", "하모니클라우드", "피치펀치", "크림소다", "베이비블루", "로맨틱모션", "실버트리", "에코브레이즈", "화이트펄", "버블소다", "모먼트스카이", "브레이브헤이즈", "플러터샤인", "라즈베리", "바이트메로스", "라이트샤도우", "베리드림", "인터스텔라", "블루스파크", "코코넛드림", "아이스커피", "로열모션", "토마토블러쉬", "버그아이", "스타더스트", "블루디엠", "스프라이트세일", "미드나잇로즈", "은혜", "환상", "창조", "꿈", "발견", "이야기", "신세계", "탐험", "예술", "멋", "유산", "대화", "열정", "감동", "명작", "정열", "열망", "현실", "향수", "감성", "순간", "역사", "전환", "삶", "유념", "기록", "햇살", "나무", "강", "별", "들", "군림", "수련", "참새", "나비", "꽃잎", "구름", "빛", "향기", "소리", "색채", "풍경", "모래", "강물", "무지개", "빗방울", "산길", "물결", "석양", "언덕", "선셋", "폭포", "바위", "나뭇잎", "식물", "연못", "여울", "코알라", "키위", "퓨전", "버블", "아침", "지혜", "미소", "은총", "길잡이", "정수", "신념", "은인", "눈빛", "이성", "꿈틀", "전율", "기쁨", "희망", "즐거움", "활기", "소망", "영혼", "행복", "편안함", "인생", "추억", "인내", "도전", "성장", "학문", "독서", "공부", "여행", "산책", "운동", "춤", "감상", "고요", "정적", "안식", "여유", "조용", "조망", "일몰", "일출", "천국", "정원", "목장", "야경", "밤하늘", "코튼", "망토", "왕관", "부채", "꽃밭", "시원", "맑음", "아이스", "쿨", "차가움", "다이아", "펄", "핑크", "민트", "레몬", "코랄", "베이지", "티티", "코코", "티파니", "리틀", "스위트", "스텔라", "루나", "로지", "베이비", "스누", "스윗", "프레시", "엔젤", "캔디", "헤이지", "심쿵", "러블", "펑키", "듀얼", "피치", "그린", "블루", "토핑", "피넛", "토피", "멜로", "블렌딩", "풍미", "크림", "블랙", "홀릭", "플레인", "골드", "데일리", "바닐라", "클래식", "더치", "핫초", "프리미엄", "소울", "카페인", "오리진", "스무드", "침대토퍼"};
    private static final Integer maxByteLength = 24;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        User user = saveOrUpdate(attributes);
        followService.saveFollowing(getOrCreateFollowing(user.getUserId()));
        followService.saveFollower(getOrCreateFollower(user.getUserId()));
        httpSession.setAttribute("user", new SessionUser(user));
        httpSession.setMaxInactiveInterval(1440000000);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(user.getRoleKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }

    private User saveOrUpdate(OAuthAttributes attributes) {
        User user = userRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getEmail()))
                .orElseGet(() -> {
                    String generatedNickname = generateRandomNickname();
                    return attributes.toEntity(generatedNickname);
                });

        return userRepository.save(user);
    }

    private Following getOrCreateFollowing(Integer userId) {
        Following userFollowing = followingRepository.findByUserId(userId);
        return userFollowing != null ? userFollowing : new Following(userId, new ArrayList<>());
    }

    private Follower getOrCreateFollower(int followId) {
        Follower followFollower = followerRepository.findByUserId(followId);
        return followFollower != null ? followFollower : new Follower(followId, new ArrayList<>());
    }

    private String generateRandomNickname() {
        String nickname = "";
        SecureRandom random = new SecureRandom();

        while (true) {
            String randomAdjective = getRandomElement(adjectives);
            String randomNoun = getRandomElement(nouns);

            nickname = randomAdjective + " " + randomNoun;

            // 중복, 길이 체크
            byte[] bytes = nickname.getBytes(java.nio.charset.StandardCharsets.UTF_8);
            if (userRepository.findByNickname(nickname).isEmpty() && bytes.length <= maxByteLength) {
                return nickname;
            }
        }
    }

    private String getRandomElement(String[] array) {
        return array[new SecureRandom().nextInt(array.length)];
    }

}
