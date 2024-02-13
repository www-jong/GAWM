import React from 'react';
import google_login from '../../assets/images/google_login.svg';

const SocialGoogle = () => {
    const redirect_uri = import.meta.env.MODE === "production" ? "https://i10e203.p.ssafy.io/gawm/" : "http://localhost:4000/gawm/";
    const BACK_URL = import.meta.env.MODE === "production" ? "https://i10e203.p.ssafy.io/gawm/back" : "http://localhost:8080/gawm/back";
    
    // oauth 요청 URL
    const googleURL = `${BACK_URL}/oauth2/authorization/google?redirect_uri=${redirect_uri}`;
    console.log(googleURL);
    const handleLogin = () => {
        window.location.href = googleURL;
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <img src={google_login} alt="구글 로그인" onClick={handleLogin} className="cursor-pointer" />
            </div>
        </>
    );
};

export default SocialGoogle;
