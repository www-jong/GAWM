import React from 'react';
import google_login from '../../assets/images/google_login.svg';

const SocialGoogle = () => {
    const redirect_uri = 'http://localhost:4000/gawm'; // Redirect URI
    // oauth 요청 URL
    const googleURL = `http://localhost:8080/gawm/oauth2/authorization/google?redirect_uri=${redirect_uri}`;

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