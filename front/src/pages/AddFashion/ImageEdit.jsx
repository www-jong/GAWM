import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButtonImg from '@/assets/images/back_button_img.png';
import CropIcon from '@/assets/images/CropIcon.png';
import EraseIcon from '@/assets/images/EraseIcon.png';
import MaskingIcon from '@/assets/images/MaskingIcon.png';
import DoBackIcon from '@/assets/images/DoBackIcon.png';
import TestImage from '@/assets/images/test_clothes.png';
import MaskingEraseIcon from '@/assets/images/MaskingEraseIcon.png';


export default function ImageEdit() {
    const navigate = useNavigate();
    const location = useLocation();

    const processedImageURL = location.state?.processedImageURL;

    const goBack = () => {  // 이건 뒤로가기관련
        navigate(-2);
    };


    // 이게 저장버튼 누르면 옷추가페이지로 보내는함수
    // 옷을 저장시킨다음, 받아오는 API로 다시 부를건가?? 잘 모르겠어서 일단 { state: { processedImageURL } } 로 구현해놈
    const handleSaveButton = () => {
        navigate('/closet/add', { state: { processedImageURL } });
    };

    return (
        <div className="flex flex-col min-h-screen">

            {/* 상단바 부분 */}
            <div className="bg-gray-100 p-1 flex justify-between items-center">
                <button onClick={goBack} className="my-1 flex items-start">
                    <img src={BackButtonImg} alt="뒤로 가기" className="size-6 ml-2 mt-1" />
                </button>
                <button className="bg-main text-white font-semibold py-1 px-4 rounded" onClick={handleSaveButton}>
                    저장
                </button>
            </div>

            {/* 이미지영역 */}
            <div className="flex-grow flex justify-center items-center bg-black">
                <img
                    src={processedImageURL || TestImage}
                    alt="테스트옷이미지"
                    style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
                />
            </div>

            {/* 하단바 영역 */}
            <div className="bg-gray-100 p-2 flex justify-around items-center mt-auto">
                <button className="flex flex-col items-center">
                    <img src={CropIcon} alt="크롭" className="w-8 h-8" />
                    <span className="text-xs mt-1">크롭</span>
                </button>
                <button className="flex flex-col items-center">
                    <img src={EraseIcon} alt="지우개" className="w-8 h-8" />
                    <span className="text-xs mt-1">지우개</span>
                </button>
                <button className="flex flex-col items-center">
                    <img src={MaskingIcon} alt="마스킹펜" className="w-8 h-8" />
                    <span className="text-xs mt-1">마스킹</span>
                </button>
                <button className="flex flex-col items-center">
                    <img src={MaskingEraseIcon} alt="마스킹펜" className="w-8 h-8" />
                    <span className="text-xs mt-1">M지우개</span>
                </button>
                <button className="flex flex-col items-center">
                    <img src={DoBackIcon} alt="리마스킹" className="w-8 h-8" />
                    <span className="text-xs mt-1">리마스킹</span>
                </button>
            </div>

        </div>
    );
}