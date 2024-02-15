import React, { useRef, useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Backbutton from '@/components/Button/BackButton.jsx';
import TagsInput from "@/components/TagsInput.jsx"
import AddClothing from '@/assets/images/AddClothing.svg';
import plus_dark from '@/assets/images/plus_dark.png';
import AddClothingModal from '@/components/Modal/AddClothingModal.jsx';
import { createLookbook } from '@/apis/lookbook.js'
import {getAllClothesInfo} from '@/apis/clothes.js'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

//import './StyleLog.module.css';
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


  const [clothesData, setClothesData] = useState(null);
  const [groupedClothes, setGroupedClothes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedClothes, setSelectedClothes] = useState([]);

  useEffect(()=> {
    console.log(selectedClothes)
  },[selectedClothes])
  const handleSelectedClothesChange = (newSelectedClothes) => {
    setSelectedClothes(newSelectedClothes);
  };
  useEffect(() => {
    const fetchClothesData = async () => {
      try {
        const tmpdata = await getAllClothesInfo();
        const data = tmpdata.data.filter(item => !item.isDeleted);
					
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
        console.log(data)
      } catch (error) {
        console.error('Clothes data fetching failed:', error);
      }
    };

    fetchClothesData();
  }, []);

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
    const clothesIds = selectedClothes.map(clothe => clothe.clothesId);
   
    const data = {
      isPublic: isPublic ? "true" : "false", // 기본 비공개로
      clothes: clothesIds, // 옷 id 배열
      tags: tags
    };
    console.log(JSON.stringify(data))
    formData.append('data', JSON.stringify(data));


    try {
      console.log(formData)
      const response = await createLookbook(formData);

      if (response.status === 200) {
        alert('룩북 생성 완료');
        navigate(`/closet`); // 성공 시 등록된 룩북 페이지로 navigate(`/lookbook/${response.data.lookbookId}`)
      } else {
        console.error('Server error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('룩북 생성에 실패했습니다.');
    }
  };

  return (
    <>
      <Backbutton />
      <form onSubmit={handleSubmit} className="space-y-4 mb-16">
        {imagePreviewUrl ? (
          <div onClick={triggerFileSelectPopup} style={{ cursor: 'pointer' }}>
            <img src={imagePreviewUrl} alt="미리보기" className="w-full h-80 object-cover" />
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
  <div>
  {selectedClothes.length > 0 ? (
    <Swiper
    slidesPerView={3} // 한 번에 보여줄 슬라이드 수를 3으로 설정
      spaceBetween={10}
      className="mySwiper"
    >
      {selectedClothes.map((clothe, index) => (
        <SwiperSlide key={index}>
          <img src={import.meta.env.VITE_CLOTHES_BASE_URL + '/' + clothe.clothesImg} alt={clothe.name} className="object-cover w-24 h-full" />
        </SwiperSlide>
      ))}
      {/* 옷 추가하기 버튼을 슬라이드로 추가 */}
      <SwiperSlide>
      <img className="mt-2" onClick={handleModalClick} src={plus_dark} alt="함께 입은 옷 추가" />
      </SwiperSlide>
    </Swiper>
  ) : (
    <img className="mt-2" onClick={handleModalClick} src={AddClothing} alt="함께 입은 옷 추가" />
  )}
  </div>
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
      {isModalOpen && <AddClothingModal 
      onClose={handleCloseModal}
      groupedClothesUse={groupedClothes}
      onSelectedClothesChange={handleSelectedClothesChange}
      selectedClothes={selectedClothes}
      />}
    </>
  );
}
