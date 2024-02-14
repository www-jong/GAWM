import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '@/components/Button/BackButton.jsx';
import testClothesData from './testClothes.json';
import { getAllClothesInfo } from '../../../apis/clothes'
import { createStyleLog } from '../../../apis/stylelog'
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
  const currentSelectedClothe = selectedClothes.find(clothe => clothe.isSelected);
  const currentScale = currentSelectedClothe ? currentSelectedClothe.scale : 1;

  const [currentDraggingIndex, setCurrentDraggingIndex] = useState(null);
  const [borderBox, setBorderBox] = useState({ x: 0, y: 0, width: 0, height: 0, visible: false });


  //선택영역 보여주는 div
  useEffect(() => {
    if (currentSelectedClothe && currentSelectedClothe.image) {
      const canvasRect = canvasRef.current.getBoundingClientRect(); // 캔버스의 위치 정보를 얻음
  
      // 현재 선택된 옷의 크기와 위치에 맞춰 테두리 상자의 크기와 위치를 업데이트
      const { width, height } = currentSelectedClothe.image;
      const drawWidth = width * currentSelectedClothe.scale;
      const drawHeight = height * currentSelectedClothe.scale;
  
      // 캔버스 상의 옷의 위치를 캔버스 요소와의 상대적 위치로 재계산
      const adjustedX = currentSelectedClothe.position.x +canvasRect.left;
      const adjustedY = currentSelectedClothe.position.y + canvasRect.top;
  
      setBorderBox({
        x: adjustedX,
        y: adjustedY,
        width: drawWidth,
        height: drawHeight,
        visible: true,
      });
    } else {
      setBorderBox(prev => ({ ...prev, visible: false }));
    }
  }, [currentSelectedClothe, canvasRef]);

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
        const { width, height } = clothe.image; // 원본 이미지의 크기
        const drawWidth = width * clothe.scale;
        const drawHeight = height * clothe.scale;
        ctx.drawImage(clothe.image, clothe.position.x, clothe.position.y, drawWidth, drawHeight);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    console.log('탑재')
    // 이벤트 핸들러 정의
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left;
      const offsetY = touch.clientY - rect.top;
  
      let foundIndex = -1;
      selectedClothes.forEach((clothe, index) => {
        const { width, height } = clothe.image;
        const drawWidth = width * clothe.scale;
        const drawHeight = height * clothe.scale;
        if (
          offsetX >= clothe.position.x && offsetX <= clothe.position.x + drawWidth &&
          offsetY >= clothe.position.y && offsetY <= clothe.position.y + drawHeight
        ) {
          foundIndex = index;
        }
      });
  
      if (foundIndex !== -1) {
        e.preventDefault(); // ★★★드래깅 대상이 있을 경우 페이지 스크롤 방지
        // 터치된 옷을 배열의 맨 뒤로 이동
        const updatedClothes = [...selectedClothes];
        const [selectedClothe] = updatedClothes.splice(foundIndex, 1); // 선택된 옷 제거
        updatedClothes.push({ ...selectedClothe, isSelected: true }); // 맨 뒤로 추가
        setSelectedClothes(updatedClothes.map((clothe, index) => ({ ...clothe, isSelected: index === updatedClothes.length - 1 }))); // 마지막 옷만 isSelected를 true로 설정
        setCurrentDraggingIndex(updatedClothes.length - 1); // 맨 뒤로 이동된 옷의 새 인덱스 설정
        setIsDragging(true);
      }
    };
  
    const handleTouchMove = (e) => {
      if (isDragging && currentDraggingIndex !== null) {
        e.preventDefault(); // ★★★드래깅 대상이 있을 경우 페이지 스크롤 방지
        const touch = e.touches[0];
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width; // 캔버스 너비 대비 터치 영역의 스케일 비율
        const scaleY = canvasRef.current.height / rect.height; // 캔버스 높이 대비 터치 영역의 스케일 비율
  
        // 현재 선택된 옷의 크기와 배율을 고려하여 중앙 위치 조정
        const currentClothe = selectedClothes[currentDraggingIndex];
        const { width, height } = currentClothe.image; // 원본 이미지 크기
        const scaledWidth = width * currentClothe.scale;
        const scaledHeight = height * currentClothe.scale;
  
        // 터치 위치에서 이미지의 중앙을 기준으로 한 위치 조정
        const x = (touch.clientX - rect.left) * scaleX - scaledWidth / 2;
        const y = (touch.clientY - rect.top) * scaleY - scaledHeight / 2;
  
        setSelectedClothes(prevSelectedClothes =>
          prevSelectedClothes.map((clothe, index) =>
            index === currentDraggingIndex ? { ...clothe, position: { x, y } } : clothe
          )
        );
      }
    };
  

    // 이벤트 리스너 등록
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [selectedClothes]); // 의존성 배열에 다른 의존성이 필요하면 추가

  const handleTouchEnd = () => {
  
    setIsDragging(false);
    setCurrentDraggingIndex(null); // 드래그 종료 후 인덱스 초기화
  };


  // 옷 선택로직(옷장에서 옷 누르면 선택)
  const handleClothingSelect = async (item) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = import.meta.env.VITE_CLOTHES_BASE_URL + '/' + item.clothesImg;
    img.onload = () => {
      // 이미 선택된 옷이 있는지 확인
      const isAlreadySelectedIndex = selectedClothes.findIndex(clothe => clothe.clothesId === item.clothesId);

      // 새로 선택된 옷을 설정하고, 기존에 선택된 옷이 있다면 맨 앞으로 이동
      if (isAlreadySelectedIndex !== -1) {
        const updatedClothes = [...selectedClothes];
        const [existingClothe] = updatedClothes.splice(isAlreadySelectedIndex, 1); // 선택된 옷 제거
        updatedClothes.push({ ...existingClothe, isSelected: true }); // 맨 뒤로 추가
        setSelectedClothes(updatedClothes.map((clothe, index) => ({ ...clothe, isSelected: index === updatedClothes.length - 1 }))); // 마지막 옷만 isSelected를 true로 설정
      } else {
        // 새로운 옷을 선택한 경우
        const newSelectedClothe = { ...item, image: img, position: { x: 50, y: 50 }, scale: 0.4, isSelected: true };
        setSelectedClothes([...selectedClothes.map(clothe => ({ ...clothe, isSelected: false })), newSelectedClothe]); // 모든 기존 옷의 isSelected를 false로 설정하고 새 옷을 맨 뒤에 추가
      }
    };
  };

  //선택된 옷 크기조절
  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setSelectedClothes(prevSelectedClothes =>
      prevSelectedClothes.map(clothe =>
        clothe.isSelected ? { ...clothe, scale: newScale } : clothe
      )
    );
  };
  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value); // 사용자가 선택한 배경색으로 상태 업데이트
  };
  // 다음버튼
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
        size: clothe.scale
      }));
      console.log('dd')
      const data = {
        date: saveTimestamp,
        location: "부산",
        weather: "좋음",
        temperature: 35,
        clotheset: clotheset
      };

      //const formData = new FormData();
      //formData.append('image', blob, 'image.png'); // Blob 형태의 이미지 데이터
      //formData.append('data', JSON.stringify(data)); // 나머지 데이터를 문자열로 변환하여 추가

      try {
        // const create = await createStyleLog(formData); // 수정: formData를 전송 ★★★★
        console.log('Style log created:');
        navigate('/closet/stylelog-add', { 
          state: { 
            imageBlob:blob,
            clotheset:clotheset,
            date: saveTimestamp

          } });
      } catch (error) {
        console.error('Failed to create style log:', error);
      }
    }, 'image/png');
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
            다음
          </button>
        </div>
      </div>

      {selectedClothes.length > 0 && (
        <div className="scale-slider">
          <input
            type="range"
            min="0.1"
            max="0.8"
            step="0.03"
            value={currentScale}
            onChange={handleScaleChange}
          />
        </div>
      )}
      {/* 배경색 선택 */}
      <div className="p-4">
        <label htmlFor="background-color-picker">배경색 선택:</label>
        <input type="color" id="background-color-picker" value={backgroundColor} onChange={handleBackgroundColorChange} />
      </div>
      {/* canvas영역 */}
      <div className="bg-gray-200 h-96 flex justify-center items-center" >
        <canvas
          ref={canvasRef}
          width={384}
          height={384}
          onTouchEnd={handleTouchEnd}
        />
        {borderBox.visible && (
          <div
            style={{
              position: 'absolute',
              left: `${borderBox.x}px`,
              top: `${borderBox.y}px`,
              width: `${borderBox.width}px`,
              height: `${borderBox.height}px`,
              border: '2px dashed blue',
              boxSizing: 'border-box',
              pointerEvents: 'none'
            }}
          ></div>
        )}
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
            <img src={import.meta.env.VITE_CLOTHES_BASE_URL + '/' + item.clothesImg} alt={item.brand} className="h-32 w-32 object-cover" />
            <p>{item.brand}</p>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}