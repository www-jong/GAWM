import React from 'react';
import google_login from '../../assets/images/google_login.svg';

const SocialGoogle = () => {
    const redirect_uri = 'https://i10e203.p.ssafy.io/gawm'; // Redirect URI
    // oauth 요청 URL
    const googleURL = `https://i10e203.p.ssafy.io/gawm/oauth2/authorization/google?redirect_uri=${redirect_uri}`;

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
