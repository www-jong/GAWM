import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButtonImg from '@/assets/images/back_button_img.png';

export default function BackButton() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <button onClick={goBack} className="my-1 flex items-start">
            <img src={BackButtonImg} alt="뒤로 가기" className="size-6 ml-2 mt-1" />
        </button>
    );
}
