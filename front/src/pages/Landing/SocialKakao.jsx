import React from 'react';
import kakao_login from '../../assets/images/kakao_login.svg';

const SocialKakao = () => {

    const redirect_uri = import.meta.env.VITE_MODE === "production" ? "https://i10e203.p.ssafy.io/gawm/" : "http://localhost:4000/gawm/";
    const BACK_URL = import.meta.env.VITE_MODE === "production" ? "https://i10e203.p.ssafy.io/gawm/back" : "http://localhost:8080/gawm/back";
    // oauth 요청 URL
    const kakaoURL = `${BACK_URL}/oauth2/authorization/kakao?redirect_uri=${redirect_uri}`;
    //const kakaoURL = `https://i10e203.p.ssafy.io/gawm/back/oauth2/authorization/kakao?redirect_uri=${redirect_uri}`;
    
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
