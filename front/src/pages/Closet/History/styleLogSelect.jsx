import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '@/components/Button/BackButton.jsx';
import testClothesData from './testClothes.json';
import {getAllClothesInfo} from '../../../apis/clothes'


export default function styleLogSelect() {
    const navigate = useNavigate();
    const location = useLocation();
    const date = location.state?.date || '날짜 불명';
    const [clothesData, setClothesData] = useState(null);
    const [groupedClothes, setGroupedClothes] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedClothes, setSelectedClothes] = useState([]);
    
    useEffect(() => {
        const fetchClothesData = async () => {
            try {
                const { data } = await getAllClothesInfo();
                const grouped = data.reduce((acc, item) => {
                    const category = item.mcategory;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(item);
                    return acc;
                }, {});
                
                setClothesData(data);
                setGroupedClothes(grouped);
                setSelectedCategory(Object.keys(grouped)[0]);
            } catch (error) {
                console.error('Clothes data fetching failed:', error);
            }
        };

        fetchClothesData();
    }, []);

    // 저장버튼
    const handleSave = () => {
        navigate('/closet');
    };

    // 카테고리용
    const categories = clothesData ? Object.keys(clothesData).filter(key => key !== 'ordered') : [];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // 선택한 옷 담기는 배열

    const handleClothingSelect = (item) => {
        const isAlreadySelected = selectedClothes.some(clothe => clothe.clothesId === item.clothesId);
        if (!isAlreadySelected) {
            // 선택된 아이템 selectedClothes 배열에 추가
            setSelectedClothes(prevSelectedClothes => [...prevSelectedClothes, item]);
        } else {
            // 이미 선택된 아이템이면 배열에서 제거
            setSelectedClothes(prevSelectedClothes => prevSelectedClothes.filter(clothe => clothe.clothesId !== item.clothesId));
        }
        console.log(selectedClothes)
    };

    // 데이터가 로딩 중일 때 처리
    if (!clothesData) {
        return <div>Loading...</div>;
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
                <p className="text-center">
                    {selectedClothes.map(clothe => clothe.clothe_img).join(', ')}
                </p>
            </div>


            {/* 카테고리 선택 영역 */}
            <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap p-4 bg-white">
                {Object.keys(groupedClothes).map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`px-4 py-2 border rounded mr-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 transition duration-200`}
                    >
                        {category}
                    </button>
                ))}
            </div>


            {/* 아이템 표시 영역 */}
            <div className="grid grid-cols-3 gap-4 p-4">
                {groupedClothes[selectedCategory]?.map((item) => (
                    <div key={item.clothesId} className={`border rounded p-4 flex flex-col items-center ${selectedClothes.find(clothe => clothe.clothesId === item.clothesId) ? 'bg-blue-100' : ''}`} onClick={() => handleClothingSelect(item)}>
                        <img src={import.meta.env.VITE_CLOTHES_BASE_URL+'/'+item.clothesImg} alt={item.brand} className="h-32 w-32 object-cover" />
                        <p>{item.brand}</p>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}