import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
      colors: colorsInput.current?.value.split(',').map((item) => item.trim()),
      materials: materialsInput.current?.value.split(',').map((item) => item.trim()),
      patterns: patternsInput.current?.value.split(',').map((item) => item.trim()),
    };

    formData.append('data', JSON.stringify(jsonData));

    try {
      const response = await fetch('http://localhost:8080/gawm/clothes', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        alert('성공: ' + result.data);
        navigate('/closet');
      } else {
        const errorResult = await response.json();
        alert('오류: ' + errorResult.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = () => {
    setSelectedFile(null);
    setImagePreviewUrl('');
    triggerFileSelectPopup();
  };

  return (
    <>
      <p>옷추가페이지</p>
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
          <div onClick={triggerFileSelectPopup} style={{ cursor: 'pointer' }}>
            <p>이미지 선택</p>
          </div>
        )}
        <input type="file" ref={fileInput} onChange={handleFileChange} style={{ visibility: 'hidden' }} />
        
        <input type="text" ref={nameInput} placeholder="이름" required />
        <input type="text" ref={brandInput} placeholder="브랜드" required />
        <input type="text" ref={mCategoryInput} placeholder="주 카테고리" required />
        <input type="text" ref={sCategoryInput} placeholder="부 카테고리" required />
        <input type="text" ref={colorsInput} placeholder="색상(쉼표로 구분)" />
        <input type="text" ref={materialsInput} placeholder="소재(쉼표로 구분)" />
        <input type="text" ref={patternsInput} placeholder="패턴(쉼표로 구분)" />
        <button type="submit">옷 추가</button>
      </form>
    </>
  );
}