import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectClothing1 from '@/assets/images/SelectClothing_1.svg';
import SelectClothing2 from '@/assets/images/SelectClothing_2.svg';

export default function AddClothing({ onClose }) {
  const navigate = useNavigate();
  const modalRef = useRef();

  const handleModalContentClick = (e) => {
    e.stopPropagation();
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
    // 이벤트 리스너를 등록하여 클릭 이벤트가 document에 전파될 때 모달 외부 클릭인지 확인합니다.
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // 모달 외부 클릭 시 onClose 함수를 호출하여 모달을 닫습니다.
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick); // 클린업 함수에서 이벤트 리스너를 제거합니다.
    };
  }, [onClose]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50" onClick={onClose}>
      <div ref={modalRef} className="fixed bottom-0 left-0 right-0 mx-auto p-4 bg-white rounded-t-xl shadow-lg flex flex-col items-center transition duration-300 ease-out translate-y-full" onClick={(e) => e.stopPropagation()}>
        <div className="w-8 h-1 rounded-xl mb-3 bg-main"></div>
        <div className="flex justify-start w-full mt-2">
          <p className="text-xl font-bold text-main">코디한 옷 추가하기</p>
        </div>
        <div className="flex flex-row justify-center gap-4 mt-4">
          <button>
            <img src={SelectClothing1} alt="Select Clothing 1" />
          </button>
          <button>
            <img src={SelectClothing2} alt="Select Clothing 2" />
          </button>
        </div>
      </div>
    </div>
  );
}