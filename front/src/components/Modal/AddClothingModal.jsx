import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectClothing1 from '@/assets/images/SelectClothing_1.svg';
import SelectClothing2 from '@/assets/images/SelectClothing_2.svg';

export default function AddClothing({ onClose, groupedClothesUse, onSelectedClothesChange,selectedClothes }) {
  const navigate = useNavigate();
  const modalRef = useRef();
  const [selectedClothesv, setSelectedClothesv] = useState(selectedClothes);

  const [groupedClothes, setGroupedClothes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const fetchClothesData = async () => {
      try {


        setGroupedClothes(groupedClothesUse);
        setSelectedCategory(Object.keys(groupedClothesUse)[0]);
      } catch (error) {
        console.error('Clothes data fetching failed:', error);
      }
    };

    fetchClothesData();
  }, []);

  const handleClothingSelect = async (item) => {
    const isAlreadySelected = selectedClothes.some(clothe => clothe.clothesId === item.clothesId);
    const newSelectedClothes = isAlreadySelected
      ? selectedClothes.filter(clothe => clothe.clothesId !== item.clothesId)
      : [...selectedClothes, item];
  
    // 상위 컴포넌트로 변경된 상태를 전달
    onSelectedClothesChange(newSelectedClothes);

  };

  useEffect(() => {
    // 상위 컴포넌트로 선택된 옷 배열을 전달하는 함수 호출
    onSelectedClothesChange(selectedClothes);
  }, [selectedClothes, onSelectedClothesChange]);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.classList.remove('translate-y-full');
        modalRef.current.classList.add('translate-y-0');
      }
    }, 10);
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50" onClick={onClose}>
      <div ref={modalRef} className="fixed bottom-0 left-0 right-0 mx-auto p-4 bg-white rounded-t-xl shadow-lg flex flex-col items-center transition duration-300 ease-out translate-y-full overflow-y-auto" style={{ maxHeight: '50vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="w-8 h-1 rounded-xl mb-3 bg-main"></div>
        <div className="flex justify-start w-full mt-2">
          <p className="text-xl font-bold text-main">코디한 옷 추가하기</p>
        </div>
        <div className="flex flex-col justify-center gap-4 mt-4 mb-2">
          {/* 카테고리 선택 영역 */}
          <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap p-4 bg-white w-full">
            {Object.keys(groupedClothes).map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 border rounded mb-2 mr-1 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400 transition duration-200`}
                >
                {category}
              </button>
            ))}
          </div>

          {/* 아이템 표시 영역 */}
          <div className="grid grid-cols-3 gap-4 p-4">
            {groupedClothes[selectedCategory]?.map((item) => (
              <div key={item.clothesId} className={`border rounded p-4 flex flex-col items-center ${selectedClothes.find(clothe => clothe.clothesId === item.clothesId) ? 'bg-blue-100' : ''}`} onClick={() => handleClothingSelect(item)}>
                <img src={import.meta.env.VITE_CLOTHES_BASE_URL + '/' + item.clothesImg} alt={item.brand} className="h-32 w-32 object-cover" />
                <p>{item.brand}</p>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}