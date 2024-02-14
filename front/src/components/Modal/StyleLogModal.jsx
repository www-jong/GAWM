import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyleLogPlus from '../../assets/images/StyleLogPlus.svg';
import { getStyleLogDetails } from '../../apis/stylelog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

import './StyleLog.module.css';

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
          // 응답에서 URL과 ID를 추출하여 저장
          const urls = responses
            .filter(response => response.status === 200 && response.data)
            .map(response => ({
              url: response.data.data.stylelogImg,
              id: response.data.data.stylelogId // ID를 저장
            }));
          setStylelogImgUrls(urls); // 이미지 URL 및 ID 배열을 업데이트
        })
        .catch(error => {
          console.error('Error fetching style log details:', error);
        });
    }
  }, [stylelogIds]);

  const handleImageClick = (stylelogId) => {
    // 이미지 클릭 시 해당 스타일로그 ID를 사용하여 네비게이트
    navigate(`/closet/stylelog/${stylelogId}`);
    onClose();
  };

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
        <div className="my-3 mb-2">
          <div className="flex justify-center w-full">
            <p className="text-xl sm:text-xl md:text-2xl font-bold text-main">{date}의 감각</p>
          </div>
          <div className="my-2">
            {stylelogImgUrls.length > 0 ? (
              <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {stylelogImgUrls.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img key={index} src={import.meta.env.VITE_CLOTHES_BASE_URL+'/'+item.url} alt={`스타일로그 이미지 ${index}`} onClick={() => handleImageClick(item.id)} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img className="mt-4 mb-2 w-full" src={StyleLogPlus} onClick={handleAddLook} alt="스타일로그 추가 이미지" />
            )}
          </div>

        </div>
      </div>
      {stylelogIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg">
          <button onClick={handleAddLook} className="w-full text-lg bg-main text-white py-3 transition duration-300 ease-in-out flex-grow">
            추가하기
          </button>
        </div>
      )}
    </div>
  );
}
