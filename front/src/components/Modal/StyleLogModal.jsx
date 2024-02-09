import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StyleLog({ date, onClose }) {
  const navigate = useNavigate(); // 이거 왜써놨더라
  const modalRef = useRef();

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {  // 모달 참조가 있을 경우 애니메이션 적용
    if (modalRef.current) {
      modalRef.current.classList.remove('translate-y-full');
      modalRef.current.classList.add('translate-y-0');
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50" onClick={onClose}>
      <div ref={modalRef} className="fixed bottom-0 left-0 right-0 mx-auto p-4 bg-white rounded-t-xl shadow-lg flex flex-col items-center transition duration-300 ease-out translate-y-full" onClick={handleModalContentClick}>
        <div className="w-8 h-1 rounded-xl mb-3 bg-main"></div>
        <div className="flex justify-start w-full">
          <p className="text-xl font-bold text-main">{date}의 감각</p>
        </div>
      </div>
    </div>
  );
}
