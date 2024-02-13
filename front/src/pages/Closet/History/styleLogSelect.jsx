import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '@/components/Button/BackButton.jsx';

export default function styleLogSelect() {
    const navigate = useNavigate();
    const location = useLocation();
    const date = location.state?.date || '날짜 불명';

    return (
        <div>

            {/* 상단바 영역 */}
            <div className="flex flex-row items-center align-middle justify-between p-4">
                <BackButton />
                <div>
                    <p className="text-lg font-semibold">{date}</p>
                </div>
                <div>
                    <button 
                      className="text-main font-semibold"
                    >
                        다음
                    </button>
                </div>
            </div>

            {/* canvas영역 */}
            <div className="bg-gray-200 h-96">
                <p className="text-center">캔버스영역</p>
            </div>
            
            {/* 옷 선택 영역 */}
            <div>
                옷 선택 영역
            </div>


        </div>
    );
}