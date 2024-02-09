import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Backbutton from '@/components/Button/Backbutton.jsx';
import CoolMascot from '@/assets/images/CoolMascot.svg';  // 이미지 테스트용

export default function AddClothes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    location.state?.processedImageURL || ''
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInput = useRef(null);
  const nameInput = useRef(null);
  const brandInput = useRef(null);
  const mCategoryInput = useRef(null);
  const sCategoryInput = useRef(null);
  const colorsInput = useRef(null);
  const materialsInput = useRef(null);
  const patternsInput = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelectPopup = () => fileInput.current.click();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append('image', selectedFile);
    } else if (imagePreviewUrl && !selectedFile) {
      const imageBlob = await fetch(imagePreviewUrl).then((response) =>
        response.blob()
      );
      formData.append('image', imageBlob, 'image.png');
    }

    const jsonData = {
      name: nameInput.current?.value,
      brand: brandInput.current?.value,
      m_category: mCategoryInput.current?.value,
      s_category: sCategoryInput.current?.value,
      colors: selectedColors,
      materials: materialsInput.current?.value.split(',').map((item) => item.trim()),
      patterns: patternsInput.current?.value.split(',').map((item) => item.trim()),
    };

    formData.append('data', JSON.stringify(jsonData));

    // try {
    //   const response = await fetch('http://localhost:8080/gawm/clothes', {
    //     method: 'POST',
    //     body: formData,
    //     credentials: 'include',
    //   });

    //   if (response.ok) {
    //     const result = await response.json();
    //     alert('성공: ' + result.data);
    //     navigate('/closet');
    //   } else {
    //     const errorResult = await response.json();
    //     alert('오류: ' + errorResult.message);
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const handleImageChange = () => {
    setSelectedFile(null);
    setImagePreviewUrl('');
    triggerFileSelectPopup();
  };

  // 색상 선택 관련

  const colorsArray = [
    { name: '흰색', colorCode: '#FFFFFF' },
    { name: '크림', colorCode: '#FFFDD0' },
    { name: '베이지', colorCode: '#F5F5DC' },
    { name: '연회색', colorCode: '#D3D3D3' },
    { name: '검정색', colorCode: '#000000' },
  ];
  const [selectedColors, setSelectedColors] = useState([]);

  // 컬러 클릭시 선택되어있으면 빼고 안되어있으면 넣고
  const handleColorSelect = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };



  return (
    <>
      <Backbutton />
      <form onSubmit={handleSubmit} className="space-y-4">
        {imagePreviewUrl ? (
          <div onClick={handleImageChange} style={{ cursor: 'pointer' }}>
            <img
              src={imagePreviewUrl}
              alt="미리보기"
              style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
            <p>이미지 변경</p>
          </div>
        ) : (
          <div
            onClick={triggerFileSelectPopup}
            className="w-full h-80 bg-gray-200 flex justify-center items-center cursor-pointer"
          >
            <p className="text-gray-500">이미지 선택</p>
          </div>
        )}
        <input type="file" ref={fileInput} onChange={handleFileChange} style={{ visibility: 'hidden' }} />

        <input type="text" ref={nameInput} placeholder="이름" required />
        <input type="text" ref={brandInput} placeholder="브랜드" required />
        <input type="text" ref={mCategoryInput} placeholder="주 카테고리" required />
        <input type="text" ref={sCategoryInput} placeholder="부 카테고리" required />

        <div className="text-lg font-semibold">색상</div>
        <div className="flex flex-wrap gap-2 items-center">
          {colorsArray.map((colorItem) => (
            <button
              key={colorItem.name}
              className={`flex items-center justify-center space-x-2 h-8 relative py-2 px-2 rounded-xl focus:outline-none ${selectedColors.includes(colorItem.name) ? 'ring-1 ring-main' : 'ring-1 ring-gray-200'}`}
              onClick={(e) => {
                e.preventDefault(); // 폼 제출 방지
                handleColorSelect(colorItem.name);
              }}
            >
              <div className={`h-6 w-6 rounded-full`} style={{ backgroundColor: colorItem.colorCode }}></div>
              <span className={`text-sm font-medium ${selectedColors.includes(colorItem.name) ? 'text-main' : 'text-gray-400'}`}>{colorItem.name}</span>
            </button>
          ))}
        </div>

        <input type="text" ref={materialsInput} placeholder="소재(쉼표로 구분)" />
        <input type="text" ref={patternsInput} placeholder="패턴(쉼표로 구분)" />
        <div className="fixed inset-x-0 bottom-0">
          <button
            type="submit"
            className="w-full h-12 bg-main text-white font-medium text-lg"
            onClick={handleSubmit}
          >
            저장
          </button>
        </div>
      </form>
    </>
  );
}