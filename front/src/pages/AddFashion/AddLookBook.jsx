import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Backbutton from '@/components/Button/BackButton.jsx';
import TagsInput from "@/components/TagsInput.jsx"
import AddClothing from '@/assets/images/AddClothing.svg';
import AddClothingModal from '@/components/Modal/AddClothingModal.jsx';

export default function AddLookBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInput = useRef(null);
  const tagsInput = useRef(null);
  const clothesInput = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(location.state?.processedImageURL || '');
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile);

    const data = {
      isPublic: isPublic, // 기본 비공개로
      clothes: clothesInput.current.value.split(',').map(id => parseInt(id.trim())), // 옷 id 배열
      tags: tags
    };

    formData.append('data', JSON.stringify(data));


    try {
      const response = await fetch('/look-book', {
        method: 'POST',
        body: formData,
        credentials: 'include', // 쿠키 포함
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('룩북 생성 완료');
        // navigate('/somewhere'); // 성공 시 해당 룩북으로 리다이렉트(나중에 룩북 상세페이지별 라우팅 하고나서)
      } else {
        console.error('Server error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Backbutton />
      <form onSubmit={handleSubmit} className="space-y-4 mb-16">
        {imagePreviewUrl ? (
          <div onClick={triggerFileSelectPopup} style={{ cursor: 'pointer' }}>
            <img src={imagePreviewUrl} alt="미리보기" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
            <p>이미지 변경</p>
          </div>
        ) : (
          <div onClick={triggerFileSelectPopup} className="w-full h-80 bg-gray-200 flex justify-center items-center cursor-pointer">
            <p className="text-gray-500">이미지 선택</p>
          </div>
        )}
        <input type="file" className="h-0" ref={fileInput} onChange={handleFileChange} style={{ visibility: 'hidden' }} />

        <div className="mx-3 flex justify-between items-center">
          <p className="text-lg font-semibold cursor-pointer w-20">공개 여부</p>
          <div>
            <button
              type="button"
              className={`mr-2 ${isPublic ? 'bg-main text-white' : 'bg-gray-200'} px-4 py-1 rounded-md`}
              onClick={() => setIsPublic(true)}
            >
              공개
            </button>
            <button
              type="button"
              className={`${!isPublic ? 'bg-main text-white' : 'bg-gray-200'} px-4 py-1 rounded-md`}
              onClick={() => setIsPublic(false)}
            >
              비공개
            </button>
          </div>
        </div>


        <hr className="my-4 border-gray-200" />
        <div className="mx-3 flex flex-col justify-between">
          <p className="text-lg font-semibold cursor-pointer w-20">태그</p>
          <TagsInput onTagsChange={handleTagsChange} />
          <input className="mt-2" type="text" ref={tagsInput} id="tags" placeholder="쉼표와 엔터로 구분됩니다." />
        </div>

        <hr className="my-4 border-gray-200" />
        <div className="mx-3 flex flex-col justify-between">
          <p className="text-lg font-semibold cursor-pointer">코디한 옷</p>
          <img className="mt-2" onClick={handleModalClick} src={AddClothing} alt="함께 입은 옷 추가" />
          <input className="mt-2" type="text" ref={clothesInput} id="clothes" placeholder="옷 ID를 입력하세요, 쉼표와 엔터로 구분됩니다." />
        </div>



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
      {isModalOpen && <AddClothingModal onClose={handleCloseModal}/>}
    </>
  );
}
