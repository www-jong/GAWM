import React from 'react';
import kakao_login from '../../assets/images/kakao_login.svg';

const SocialKakao = () => {
    const KAKAO_CLIENT_ID = 'REST API KEY'; // REST API KEY = KAKAO_CLIENT_ID
    const redirect_uri = 'http://localhost:4000/gawm-front/landing'; // Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <img src={kakao_login} alt="카카오 로그인" onClick={handleLogin} className="cursor-pointer" />
            </div>
        </>
    );
};

export default SocialKakao;
