import React, { useRef } from 'react';

export default function AddLookBook() {
  const fileInput = useRef(null);
  const tagsInput = useRef(null);
  const clothesInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // 파일을 formData에 추가
    formData.append('image', fileInput.current.files[0]);
    // 태그와 옷 정보를 JSON 문자열로 변환하여 formData에 추가
    formData.append('tag', JSON.stringify(tagsInput.current.value.split(',').map(tag => tag.trim())));
    formData.append('clothe', JSON.stringify(clothesInput.current.value.split(',').map(clothe => clothe.trim())));

    try {
      const response = await fetch('http://localhost:8080/stylelog', {
        method: 'POST',
        headers: {
          // 인증 넣어야하는지?? 세션이라 안넣어도 되려나
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        alert('룩북 등록 성공!: ' + result.data);
      } else if (response.status === 401) {
        const errorResult = await response.json();
        alert('인증 오류: ' + errorResult.message);
      } else {
        throw new Error('서버 오류ㅠ');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다ㅠ: ' + error.message);
    }
  };

  return (
    <>
      <p className="text-2xl font-extrabold">감각추가페이지</p>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileInput} required />
        <input type="text" ref={tagsInput} placeholder="태그 (쉼표로 구분)" required />
        <input type="text" ref={clothesInput} placeholder="옷 (쉼표로 구분)" required />
        <button type="submit">룩 등록</button>
      </form>
    </>
  );
}
