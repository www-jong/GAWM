import React from 'react';
import BackButton from '@/components/Button/BackButton.jsx';
import { createStyleLog } from '@/apis/stylelog.js';
import { useLocation, useNavigate } from 'react-router-dom';

export default function styleLogAdd() {
    const location = useLocation();
    const navigate = useNavigate();
    const { date } = location.state || {};

    const handleSave = async () => {
        const formData = new FormData();

        try {
            await createStyleLog(formData);
            console.log("스타일로그가 등록 성공.");
            navigate('/closet');  // 스타일로그 id별 페이지가 따로 있으면 좋을텐데
        } catch (error) {
            console.error("스타일로그 등록 중 오류 발생:", error);
        }
    };

    return (
        <div className="flex flex-col font-pretendard">
            {/* 상단바 영역 */}
            <div className="flex flex-row items-center align-middle justify-between p-4">
                <BackButton />
                <div>
                    <p className="text-lg font-semibold">{date ? date : '날짜 불명'}</p>
                </div>
                <div>
                    <button
                        className="text-main font-semibold"
                        onClick={handleSave}
                    >
                        완료
                    </button>
                </div>
            </div>

            {/* 이미지 영역 */}
            <div className="w-full h-80 bg-gray-200 flex justify-center items-center">
                <p className="text-gray-500">캔버스이미지</p>
            </div>

            {/* 날씨 */}
            <div className="mx-3 my-3">
                <p className="text-lg font-semibold my-2 mt-4">날씨</p>
            </div>

            {/* 장소 */}
            <div className="mx-3 my-3">
                <p className="text-lg font-semibold my-2 mt-4">장소</p>
            </div>
        </div>
    );
}