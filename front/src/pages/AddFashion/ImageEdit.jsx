import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButtonImg from '@/assets/images/back_button_img.png';
import CropIcon from '@/assets/images/CropIcon.png';
import EraseIcon from '@/assets/images/EraseIcon.png';
import MaskingIcon from '@/assets/images/MaskingIcon.png';
import DoBackIcon from '@/assets/images/DoBackIcon.png';


export default function ImageEdit() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-2);
    };

    return (
        <div className="flex flex-col">

            {/* 상단바 부분 */}
            <div className="bg-gray-200 p-2 flex justify-between items-center">
                <button onClick={goBack} className="my-1 flex items-start">
                    <img src={BackButtonImg} alt="뒤로 가기" className="size-6 ml-2 mt-1" />
                </button>
                <button className="bg-main text-white font-bold py-2 px-4 rounded">
                    저장
                </button>
            </div>

            {/* 이미지영역 */}
            <div>
                <p>이미지에딧</p>
            </div>

            {/* 하단바 영역 */}
            <div>
                <p>버튼들영역</p>
            </div>

        </div>
    );
}