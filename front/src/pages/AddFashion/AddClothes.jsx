import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Backbutton from '@/components/Button/Backbutton.jsx';
import downArrow from '@/assets/images/down-arrow.png';

export default function AddClothes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(location.state?.processedImageURL || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dropdownOpenMain, setDropdownOpenMain] = useState(null);
  const [dropdownOpenSub, setDropdownOpenSub] = useState(false);
  const [dropdownOpenColor, setDropdownOpenColor] = useState(false);
  const [dropdownOpenMaterial, setDropdownOpenMaterial] = useState(false);
  const [dropdownOpenPattern, setDropdownOpenPattern] = useState(false);

  const fileInput = useRef(null);
  const nameInput = useRef(null);
  const brandInput = useRef(null);
  const mCategoryInput = useRef(null);
  const sCategoryInput = useRef(null);
  const colorsInput = useRef(null);
  const materialsInput = useRef(null);
  const patternsInput = useRef(null);

  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);

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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


  const category = [
    { m_category: '상의', s_category: ['티셔츠', '니트/스웨터', '셔츠', '블라우스', '맨투맨/스웨트셔츠', '후드', '민소매/슬리브리스'] },
    { m_category: '원피스/점프수트', s_category: ['캐주얼 원피스', '미니원피스', '티셔츠 원피스', '셔츠 원피스', '맨투맨/후드 원피스', '니트 원피스', '자켓 원피스', '멜빵 원피스', '점프수트', '파티/이브닝 원피스', '기타'] },
    { m_category: '바지', s_category: ['반바지', '청바지', '긴바지', '정장바지', '운동복', '레깅스', '기타'] },
    { m_category: '스커트', s_category: ['미니', '미디', '롱', '기타'] },
    { m_category: '아우터', s_category: ['카디건', '재킷', '레더재킷', '트위드재킷', '코트', '숏패딩', '롱패딩', '경량 패딩', '트렌치코트', '사파리/헌팅재킷', '점퍼', '무스탕', '베스트', '레인코트'] }
  ];

  const colorsArray = [
    { name: '흰색', colorCode: '#FFFFFF' },
    { name: '크림', colorCode: '#FFFDD0' },
    { name: '베이지', colorCode: '#F5F5DC' },
    { name: '연회색', colorCode: '#D3D3D3' },
    { name: '검정색', colorCode: '#000000' },
    { name: '노랑', colorCode: '#FFFF00' },
    { name: '코랄', colorCode: '#FF7F50' },
    { name: '연분홍', colorCode: '#FFB6C1' },
    { name: '빨강', colorCode: '#FF0000' },
    { name: '파랑', colorCode: '#0000FF' },
    { name: '하늘색', colorCode: '#87CEEB' },
    // 다채색은 나중에 이미지로?
  ];

  const patternsArray = ['무지', '체크', '스트라이프', '프린트', '도트', '애니멀', '플로럴', '트로피칼', '페이즐리', '아가일', '밀리터리', '기타'];
  const materialsArray = [
    '면', '린넨', '폴리에스테르', '니트', '울', '퍼', '트위드', '나일론', '데님', '가죽', '스웨이드', '벨벳', '쉬폰', '실크', '코듀로이', '레이스', '기타'
  ];



  // 컬러, 소재, 패턴 선택되어있으면 빼고 안되어있으면 넣고

  const handleMainCategoryChange = (event) => {
    setMainCategory(event.target.value);
    setSubCategory(''); // 부 카테고리 초기화
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };


  const handleColorSelect = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleMaterialSelect = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const handlePatternSelect = (pattern) => {
    if (selectedPatterns.includes(pattern)) {
      setSelectedPatterns(selectedPatterns.filter((p) => p !== pattern));
    } else {
      setSelectedPatterns([...selectedPatterns, pattern]);
    }
  };


  return (
    <>
      <Backbutton />
      <form onSubmit={handleSubmit} className="mb-16">
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
        
        <div className="mx-3 text-lg font-semibold">이름</div>
        <input className="w-80 mx-3 border-b-2 border-gray-100" type="text" ref={nameInput} placeholder="이름을 입력하세요" required />
        
        {/* <hr className="my-12 border-gray-200" /> */}
        <div className="mt-3 mx-3 text-lg font-semibold">브랜드</div>
        <input className="w-80 mx-3 border-b-2 border-gray-100" type="text" ref={brandInput} placeholder="브랜드를 입력하세요" required />

        
        {/* 주 카테고리 드롭다운 */}
        <div className="mx-3 my-3">
          <label htmlFor="mainCategory" className="text-lg font-semibold">주 카테고리</label>
          <select
            id="mainCategory"
            className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-main focus:ring focus:ring-main focus:ring-opacity-50"
            value={mainCategory}
            onChange={handleMainCategoryChange}
            required
          >
            <option value="">선택하세요</option>
            {category.map((c) => (
              <option key={c.m_category} value={c.m_category}>{c.m_category}</option>
            ))}
          </select>
        </div>

        {/* 부 카테고리 드롭다운 */}
        <div className="mx-3 my-3">
          <label htmlFor="subCategory" className="text-lg font-semibold">부 카테고리</label>
          <select
            id="subCategory"
            className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-main focus:ring focus:ring-main focus:ring-opacity-50"
            value={subCategory}
            onChange={handleSubCategoryChange}
            required
            disabled={!mainCategory} // 주 카테고리가 선택되지 않으면 비활성화
          >
            <option value="">선택하세요</option>
            {mainCategory && category.find((c) => c.m_category === mainCategory)?.s_category.map((sc) => (
              <option key={sc} value={sc}>{sc}</option>
            ))}
          </select>
        </div>



        <hr className="my-3 border-gray-200" />
        <div onClick={() => setDropdownOpenColor(!dropdownOpenColor)}>
          <div className="mx-3 flex justify-between items-center">
            <p className="text-lg font-semibold cursor-pointer" onClick={toggleDropdown}>
              색상
            </p>
            <div className="flex-grow text-right">
              {selectedColors.length > 0 ? (
                <p className="mr-2 text-base font-medium text-quaternary">
                  {selectedColors.join(', ')}
                </p>
              ) : (
                <p className="text-base font-medium text-quaternary">선택된 색상 없음</p>
              )}
            </div>
            <img className="ml-1 size-5" src={downArrow} alt="아래화살표" />
          </div>
        </div>
        {dropdownOpenColor && (
          <div className="flex flex-wrap mx-4 gap-2 items-center">
            {colorsArray.map((colorItem) => (
              <button
                key={colorItem.name}
                className={`flex items-center justify-center space-x-2 h-8 relative py-2 px-2 rounded-xl focus:outline-none ${selectedColors.includes(colorItem.name) ? 'ring-1 ring-main' : 'ring-1 ring-gray-200'}`}
                onClick={(e) => {
                  e.preventDefault(); // 폼 제출 방지
                  handleColorSelect(colorItem.name);
                }}
              >
                <div className={`h-5 w-5 rounded-full`} style={{ backgroundColor: colorItem.colorCode }}></div>
                <span className={`text-sm font-medium ${selectedColors.includes(colorItem.name) ? 'text-main' : 'text-gray-400'}`}>{colorItem.name}</span>
              </button>
            ))}
          </div>
        )}

        

        <hr className="my-3 border-gray-200" />
        <div onClick={() => setDropdownOpenMaterial(!dropdownOpenMaterial)}>
          <div className="mx-3 flex justify-between items-center">
            <p className="text-lg font-semibold cursor-pointer">
              소재
            </p>
            <div className="flex-grow text-right">
              {selectedMaterials.length > 0 ? (
                <p className="mr-2 text-base font-medium text-quaternary">
                  {selectedMaterials.join(', ')}
                </p>
              ) : (
                <p className="text-base font-medium text-quaternary">선택된 소재 없음</p>
              )}
            </div>
            <img className="ml-1 size-5" src={downArrow} alt="아래화살표" />
          </div>
        </div>
        {dropdownOpenMaterial && (

          <div className="flex flex-wrap mx-4 gap-2 items-center">
            {materialsArray.map((material) => (
              <button
                key={material}
                className={`flex items-center justify-center space-x-2 h-8 relative py-2 px-2 rounded-xl focus:outline-none ${selectedMaterials.includes(material) ? 'ring-1 ring-main' : 'ring-1 ring-gray-200'}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMaterialSelect(material);
                }}
              >
                <span className={`text-sm font-medium ${selectedMaterials.includes(material) ? 'text-main' : 'text-gray-400'}`}>{material}</span>
              </button>
            ))}
          </div>
        )}


        <hr className="my-3 border-gray-200" />
        <div onClick={() => setDropdownOpenPattern(!dropdownOpenPattern)}>
          <div className="mx-3 flex justify-between items-center">
            <p className="text-lg font-semibold cursor-pointer">
              패턴
            </p>
            <div className="flex-grow text-right">
              {selectedPatterns.length > 0 ? (
                <p className="mr-2 text-base font-medium text-quaternary">
                  {selectedPatterns.join(', ')}
                </p>
              ) : (
                <p className="text-base font-medium text-quaternary">선택된 패턴 없음</p>
              )}
            </div>
            <img className="ml-1 size-5" src={downArrow} alt="아래화살표" />
          </div>
        </div>
        {dropdownOpenPattern && (

          <div className="flex flex-wrap mx-4 gap-2 items-center">
            {patternsArray.map((pattern) => (
              <button
                key={pattern}
                className={`flex items-center justify-center space-x-2 h-8 relative py-2 px-2 rounded-xl focus:outline-none ${selectedPatterns.includes(pattern) ? 'ring-1 ring-main' : 'ring-1 ring-gray-200'}`}
                onClick={(e) => {
                  e.preventDefault();
                  handlePatternSelect(pattern);
                }}
              >
                <span className={`text-sm font-medium ${selectedPatterns.includes(pattern) ? 'text-main' : 'text-gray-400'}`}>{pattern}</span>
              </button>
            ))}
          </div>
        )}




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