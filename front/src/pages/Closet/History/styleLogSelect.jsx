import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '@/components/Button/BackButton.jsx';
import testClothesData from './testClothes.json';

export default function styleLogSelect() {
    const navigate = useNavigate();
    const location = useLocation();
    const date = location.state?.date || '날짜 불명';

    // Test data
    const clothesData = testClothesData;

    // 저장버튼
    const handleSave = () => {
        navigate('/closet');
      };

    // 카테고리용
    const [selectedCategory, setSelectedCategory] = useState('outers');
    const categories = Object.keys(clothesData).filter(key => key !== 'ordered');

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // 선택한 옷 담기는 배열
    const [selectedClothes, setSelectedClothes] = useState([]);

    const handleClothingSelect = (item) => {
        // 이미 선택된 아이템인지 확인
        const isAlreadySelected = selectedClothes.find(clothe => clothe.clothe_id === item.clothe_id);

        if (!isAlreadySelected) {
            // 선택된 아이템 selectedClothes 배열에 추가
            setSelectedClothes(prevSelectedClothes => [...prevSelectedClothes, item]);
        } else {
            // 이미 선택된 아이템이면 배열에서 제거
            setSelectedClothes(prevSelectedClothes => prevSelectedClothes.filter(clothe => clothe.clothe_id !== item.clothe_id));
        }
    }


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
                        onClick={handleSave}
                    >
                        저장
                    </button>
                </div>
            </div>

            {/* canvas영역 */}
            <div className="bg-gray-200 h-96">
                <p className="text-center">캔버스영역</p>
            </div>


            {/* 카테고리 선택 영역 */}
            <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap p-4 bg-white">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 border rounded mr-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 transition duration-200`}
                        onClick={() => handleCategorySelect(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>


            {/* 아이템 표시 영역 */}
            <div className="grid grid-cols-3 gap-4 p-4">
                {clothesData[selectedCategory].map((item) => (
                    <div key={item.clothe_id} className={`border rounded p-4 flex flex-col items-center ${selectedClothes.find(clothe => clothe.clothe_id === item.clothe_id) ? 'bg-blue-100' : ''}`} onClick={() => handleClothingSelect(item)}>
                        <img src={item.clothe_img} alt={item.name} className="h-32 w-32 object-cover" />
                        <p>{item.brand}</p>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}