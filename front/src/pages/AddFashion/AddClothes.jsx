import React, { useRef } from 'react';

export default function AddClothes() {
  // 각 입력 필드와 파일 인풋에 대한 ref를 생성
  const fileInput = useRef(null);
  const nameInput = useRef(null);
  const brandInput = useRef(null);
  const mCategoryInput = useRef(null);
  const sCategoryInput = useRef(null);
  const colorsInput = useRef(null);
  const materialsInput = useRef(null);
  const patternsInput = useRef(null);

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', fileInput.current.files[0]);

    const data = {
      name: nameInput.current.value,
      brand: brandInput.current.value,
      m_category: mCategoryInput.current.value,
      s_category: sCategoryInput.current.value,
      colors: colorsInput.current.value.split(',').map(item => item.trim()), // 쉼표로 구분된 문자열을 배열로 변환
      materials: materialsInput.current.value.split(',').map(item => item.trim()),
      patterns: patternsInput.current.value.split(',').map(item => item.trim()),
    };

    formData.append('data', JSON.stringify(data));

    try {
      const response = await fetch('http://localhost:8080/clothes', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.data); // 성공 메시지 표시
      } else {
        const errorResult = await response.json();
        alert(errorResult.message); // 오류 메시지 표시
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <p>옷추가페이지</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" ref={fileInput} required />
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
