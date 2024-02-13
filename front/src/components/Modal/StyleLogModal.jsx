import React, { useEffect, useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyleLogPlus from '../../assets/images/StyleLogPlus.svg'
import {getStyleLogDetails} from '../../apis/stylelog'
export default function StyleLog({ date, onClose,stylelogIds }) {
  const navigate = useNavigate();
  const modalRef = useRef();
  const [images, setImages] = useState([]);

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (stylelogIds.length > 0) {
      // 예시로 첫 번째 stylelogId만 처리
      const stylelogId = stylelogIds[0];
      getStyleLogDetails(stylelogId).then(response => {
        if (response.status === 200 && response.data) {
          console.log(response.data.data)
          drawImagesOnCanvas(response.data.data.clothesDetails);
        }
      });
    }
  }, [stylelogIds]);

  useEffect(() => {
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.classList.remove('translate-y-full');
        modalRef.current.classList.add('translate-y-0');
      }
    }, 10); // 렌더링 애니메이션 이슈때문에 10ms만 줌
  }, []);

  const handleAddLook = () => {
    navigate('/closet/stylelog-select', { state: { date } });
    onClose();
  };

  const drawImagesOnCanvas = (clothesDetails) => {
    // 캔버스 초기화
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
  
    const loadImages = clothesDetails.map(detail => {
      return new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve({ img, detail });
        img.src = `${import.meta.env.VITE_CLOTHES_BASE_URL}/${detail.clothesInfoResponse.clothesImg}`;
      });
    });
  
    Promise.all(loadImages).then(images => {
      // 이미지 배열 초기화
      setImages([]);
  
      images.forEach(({ img, detail }) => {
        ctx.drawImage(img, detail.x, detail.y, 100, 100); // 옷 이미지 그리기
      });
  
      // 최종 이미지 생성 및 상태 업데이트
      const resizedCanvas = document.createElement('canvas');
      resizedCanvas.width = 400; // 변경 가능
      resizedCanvas.height = 100; // 변경 가능
      const resizedCtx = resizedCanvas.getContext('2d');
      resizedCtx.drawImage(canvas, 0, 0, 400, 100);
      setImages(prevImages => [...prevImages, resizedCanvas.toDataURL()]);
    });
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
    {/* 이미지가 있을 경우에만 이미지를 표시하고, 없으면 기본 이미지를 표시 */}
    {images.length > 0 ? (
      images.map((src, index) => (
        <img key={index} className="mt-4 mb-2 w-24 h-24 object-cover" src={src} alt="스타일로그 이미지" />
      ))
    ) : (
      <img className="mt-4 mb-2 w-24 h-24 object-cover" src={StyleLogPlus} onClick={handleAddLook} alt="스타일로그 추가 이미지" />
    )}
  </div>
    </div>
  );
}
