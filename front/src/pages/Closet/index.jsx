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
            <div className="fixed top-0 left-0 right-0 mx-2.5 my-1.5">
                <TopBar title={<h1 className="font-bold text-2xl">내 옷장</h1>} />
            </div>

            <div className="flex flex-col gap-4 mt-12 px-2.5">
                <WeeklyWeather />

                <div className="flex border-b">
                    <button 
                        onClick={() => setActiveTab('closet')}
                        className={`flex-1 text-center py-2 font-bold ${activeTab === 'closet' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                    >
                        옷장
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 text-center py-2 font-bold ${activeTab === 'history' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
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
