import React, { useState,useEffect,useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '@/components/Button/BackButton.jsx';
import testClothesData from './testClothes.json';
import {getAllClothesInfo} from '../../../apis/clothes'
import {createStyleLog} from '../../../apis/stylelog'
import moment from 'moment';
export default function styleLogSelect() {
    const navigate = useNavigate();
    const location = useLocation();
    const canvasRef = useRef(null);
    const date = location.state?.date || '날짜 불명';
    const [clothesData, setClothesData] = useState(null);
    const [groupedClothes, setGroupedClothes] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    // 선택된 옷들의 상태와 위치 정보를 포함하는 배열로 변경
    const [selectedClothes, setSelectedClothes] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // 배경색 초기값 설정

const [currentDraggingIndex, setCurrentDraggingIndex] = useState(null);
  
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // 캔버스 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 배경색 적용
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 선택된 모든 옷 이미지를 그림
  selectedClothes.forEach(clothe => {
      if (clothe.image && clothe.position) {
          ctx.drawImage(clothe.image, clothe.position.x, clothe.position.y, 100, 100);
      }
  });
}, [selectedClothes, backgroundColor]); // 의존성 배열에 backgroundColor 추

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
  

    // 옷 선택 로직 수정: 옷 이미지 로드와 위치 정보 추가
    const handleClothingSelect = async (item) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = import.meta.env.VITE_CLOTHES_BASE_URL + '/' + item.clothesImg;
      img.onload = () => {
        const isAlreadySelected = selectedClothes.some(clothe => clothe.clothesId === item.clothesId);
        if (!isAlreadySelected) {
          setSelectedClothes(prevSelectedClothes => [
            ...prevSelectedClothes,
            { ...item, image: img, position: { x: 50, y: 50 } }, // 초기 위치 설정
          ]);
        } else {
          // 이미 선택된 아이템이면 배열에서 제거
          setSelectedClothes(prevSelectedClothes =>
            prevSelectedClothes.filter(clothe => clothe.clothesId !== item.clothesId)
          );
        }
      };
    };

    const handleBackgroundColorChange = (e) => {
      setBackgroundColor(e.target.value); // 사용자가 선택한 배경색으로 상태 업데이트
  };
    // 저장버튼
    const handleSave = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      canvas.toBlob(async (blob) => {
        

          let saveTimestamp;
  if (date !== '날짜 불명') {
    saveTimestamp = moment(date, 'YYYY년 M월 D일').valueOf();
  } else {
    saveTimestamp = Date.now();
  }
    console.log(saveTimestamp)
          const clotheset = selectedClothes.map(clothe => ({
              clothesId: clothe.clothesId,
              x: clothe.position.x,
              y: clothe.position.y,
              rotate: 0,
              size: 100
          }));
          console.log('dd')
          const data = {
              date: saveTimestamp,
              location: "부산",
              weather: "좋음",
              temperature: 35,
              clotheset: clotheset
          };
  
          const formData = new FormData();
          formData.append('image', blob, 'image.png'); // Blob 형태의 이미지 데이터
          formData.append('data', JSON.stringify(data)); // 나머지 데이터를 문자열로 변환하여 추가
  
          try {
              const create = await createStyleLog(formData); // 수정: formData를 전송
              console.log('Style log created:', create);
              navigate('/closet');
          } catch (error) {
              console.error('Failed to create style log:', error);
          }
      }, 'image/png');
  };

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = backgroundColor;
        ctx.drawImage(image, position.x, position.y, 100, 100);
      };

      const handleTouchStart = (e) => {
  const touch = e.touches[0];
  const rect = canvasRef.current.getBoundingClientRect();
  const offsetX = touch.clientX - rect.left;
  const offsetY = touch.clientY - rect.top;
  let dragging = false;
  
  selectedClothes.forEach((clothe, index) => {
    if (
      offsetX >= clothe.position.x && offsetX <= clothe.position.x + 100 &&
      offsetY >= clothe.position.y && offsetY <= clothe.position.y + 100
    ) {
      dragging = true;
      setCurrentDraggingIndex(index); // 드래그 중인 옷의 인덱스 저장
    }
  });

  setIsDragging(dragging);
};

const handleTouchMove = (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left - 50; // 옷 이미지 중앙을 터치 포인트로 조정
    const y = touch.clientY - rect.top - 50; // 옷 이미지 중앙을 터치 포인트로 조정
    
    setSelectedClothes(prevSelectedClothes =>
      prevSelectedClothes.map((clothe, index) =>
        index === currentDraggingIndex ? { ...clothe, position: { x, y } } : clothe
      )
    );
  }
};

const handleTouchEnd = () => {
  
  setIsDragging(false);
  setCurrentDraggingIndex(null); // 드래그 종료 후 인덱스 초기화
};
    // 카테고리용
    const categories = clothesData ? Object.keys(clothesData).filter(key => key !== 'ordered') : [];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // 선택한 옷 담기는 배열


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
{/* 배경색 선택 */}
<div className="p-4">
                <label htmlFor="background-color-picker">배경색 선택:</label>
                <input type="color" id="background-color-picker" value={backgroundColor} onChange={handleBackgroundColorChange} />
            </div>
            {/* canvas영역 */}
            <div className="bg-gray-200 h-96 flex justify-center items-center">
            <canvas
      ref={canvasRef}
      width={400}
      height={400}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
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