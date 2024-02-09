import React from 'react';
import spinner from '@/assets/images/gawm_spin.gif';

export default function Loading() {
    return (
        <div className="ixed inset-0 z-50 flex flex-col gap-3 items-center justify-center h-screen bg-gray-800">
            <img src={spinner} alt="로딩 중..." className="w-20 h-20" />
            <p className="text-white text-lg">AI가 옷을 분석 중이에요...</p>
        </div>
    );
}
