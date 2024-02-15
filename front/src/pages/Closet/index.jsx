import React, { useState } from 'react';
import TopBar from "../../components/TopBar";
import WeeklyWeather from "./WeeklyWeather";
import History from "./History/index.jsx";
import MyCloset from "./MyCloset/index.jsx";
import FloatingButton from "../../components/Button/FloatingButton.jsx";
import AddInClosetModal from "../../components/Modal/AddInClosetModal.jsx";

export default function Closet() {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('closet'); // 'closet' 또는 'history' 값을 가질 수 있는 상태 변수

    return (
        <>
            <div className="mx-2.5 my-3">
                <TopBar title={<h1 className="font-bold text-2xl">내 옷장</h1>} />
            </div>

            <div className="flex flex-col gap-4 px-2.5">
                <WeeklyWeather />

                <div className="flex border-b">
                    <button 
                        onClick={() => setActiveTab('closet')}
                        className={`flex-1 text-center py-2 text-lg font-bold ${activeTab === 'closet' ? 'border-b-4 border-tertiary text-tertiary' : 'text-tertiary'}`}
                    >
                        옷장
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 text-center py-2 text-lg font-bold ${activeTab === 'history' ? 'border-b-4 border-tertiary text-tertiary' : 'text-tertiary'}`}
                    >
                        뭐입었더라?
                    </button>
                </div>

                {/* 선택된 탭에 따라 컴포넌트 렌더 */}
                {activeTab === 'closet' && <MyCloset />}
                {activeTab === 'history' && <History />}
                <FloatingButton onAddClick={() => setShowModal(true)} />
            </div>
            {showModal && <AddInClosetModal onClose={() => setShowModal(false)} />}
        </>
    );
}
