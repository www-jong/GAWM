import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyleLogPlus from '../../assets/images/StyleLogPlus.svg';
import { getStyleLogDetails } from '../../apis/stylelog';

export default function StyleLog({ date, onClose, stylelogIds }) {
  const navigate = useNavigate();
  const modalRef = useRef();
  const [stylelogImgUrl, setStylelogImgUrl] = useState('');
  const [stylelogImgUrls, setStylelogImgUrls] = useState([]); // 여러 이미지 URL을 저장할 배열 상태

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (stylelogIds.length > 0) {
      // 모든 stylelogIds에 대해 getStyleLogDetails 호출
      Promise.all(stylelogIds.map(stylelogId => getStyleLogDetails(stylelogId)))
        .then(responses => {
          const urls = responses
            .filter(response => response.status === 200 && response.data)
            .map(response => response.data.data.stylelogImg);
          console.log(urls)
          setStylelogImgUrls(urls); // 이미지 URL 배열을 업데이트
        })
        .catch(error => {
          console.error('Error fetching style log details:', error);
        });
    }
  }, [stylelogIds]);

  useEffect(() => {
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.classList.remove('translate-y-full');
        modalRef.current.classList.add('translate-y-0');
      }
    }, 10);
  }, []);

  const handleAddLook = () => {
    navigate('/closet/stylelog-select', { state: { date } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50" onClick={onClose}>
      <div ref={modalRef} className="fixed bottom-0 left-0 right-0 mx-auto p-4 bg-white rounded-t-xl shadow-lg flex flex-col items-center transition duration-300 ease-out translate-y-full" onClick={handleModalContentClick}>
        <div className="w-8 h-1 rounded-xl mb-3 bg-main"></div>
        <div className="flex justify-start w-full mt-2">
          <p className="text-xl font-bold text-main">{date}의 감각</p>
          {stylelogIds.length > 0 && (
            <button onClick={handleAddLook} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300 ease-in-out">
              추가하기
            </button>
          )}
        </div>
        {/* 스타일로그 이미지를 표시하고, 없으면 기본 이미지를 표시 */}
        {stylelogImgUrls.length > 0 ? (
          stylelogImgUrls.map((url, index) => (
            <img key={index} className="mt-4 mb-2 w-24 h-24 object-cover" src={import.meta.env.VITE_CLOTHES_BASE_URL+'/'+url} alt={`스타일로그 이미지 ${index}`} />
          ))
        ) : (
          <img className="mt-4 mb-2 w-full" src={StyleLogPlus} onClick={handleAddLook} alt="스타일로그 추가 이미지" />
        )}
      </div>
    </div>
  );
}
