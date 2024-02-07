import privateaxios from '../../api/gawmBackAxios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

const Oauth2 = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const navigate = useNavigate();
	console.log("code :",code);
    useEffect(() => {
        console.log("code :",code)
        const fetchToken = async () => {
            try {
                // 여기서 privateaxios를 사용할지 axios를 사용할지에 따라 달라질 수 있습니다.
                // privateaxios를 사용하는 경우, 해당 인스턴스의 baseURL과 관련 설정이 이미 정의되어 있어야 합니다.
                const response = await axios.post(`http://localhost:8080/gawm-back/login/oauth2/code/${code}`);
                console.log("응답확인", response);
                // 응답에서 필요한 데이터를 추출하여 처리
                localStorage.setItem('name', response.data.user_name); // 예시 처리
                navigate('/'); // 성공 시 리다이렉트
            } catch (error) {
                console.error("인증 오류", error);
            }
        };

        fetchToken();
    }, [code, navigate]); // 의존성 배열에 code와 navigate를 추가

    return <div>로그인 중입니다.</div>;
};

export default Oauth2;
