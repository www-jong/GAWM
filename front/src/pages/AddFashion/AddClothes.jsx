import React, { useRef, useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Backbutton from '@/components/Button/BackButton.jsx';
import downArrow from '@/assets/images/down-arrow.png';
import {get_tagging_status,get_tag_v2,uploadClothesImage,get_tag_v3,get_alltag} from '../../apis/clothes'
export default function AddClothes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(location.state?.processedImageURL || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dropdownOpenColor, setDropdownOpenColor] = useState(false);
  const [dropdownOpenMaterial, setDropdownOpenMaterial] = useState(false);
  const [dropdownOpenPattern, setDropdownOpenPattern] = useState(false);
  const [product_id, setProduct_id] = useState(location.state?.product_id || '');
  const [aiTaggingStatus, setAiTaggingStatus] = useState(false);
  const [aiTaggingInProgress, setAiTaggingInProgress] = useState(false); // AI 태깅 진행 중 상태

  const fileInput = useRef(null);
  const nameInput = useRef(null);
  const brandInput = useRef(null);
  const mCategoryInput = useRef(null);
  const sCategoryInput = useRef(null);
  const colorsInput = useRef(null);
  const materialsInput = useRef(null);
  const patternsInput = useRef(null);

  const [mainCategory, setMainCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [colorsArray, setColorsArray] = useState([]);
  const [patternsArray,setPatternsArray]=useState([]);
  const [materialsArray, setMaterialsArray] = useState([]);
  /**
  const colorsArray = [
    { name: '흰색', colorCode: 'white' },
    { name: '크림', colorCode: '#FFFDD0' },
    { name: '베이지', colorCode: '#F5F5DC' },
    { name: '연회색', colorCode: '#D3D3D3' },
    { name: '검정색', colorCode: 'black' },
    { name: '노랑', colorCode: 'yellow' },
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
   */
  const fetchData = async () => {
    try {
      // get_alltag() 함수 호출을 통해 태그 데이터를 비동기로 받아옴
      const response = await get_alltag();
      if (response.status === 200) {
        const data = await response.data; // JSON 형태로 데이터를 파싱
        // 받아온 데이터를 각 상태에 설정
        setColorsArray(data.colors);
        setPatternsArray(data.patterns.map(pattern => pattern.name)); // 패턴 배열에서는 객체가 아닌 이름만 저장
        setMaterialsArray(data.materials.map(material => material.name)); // 재질 배열에서는 객체가 아닌 이름만 저장
      }
    } catch (error) {
      console.error('태그 데이터 로딩 중 오류 발생:', error);
    }
  };

/**
  useEffect(() => {
    // aiTaggingInProgress 상태가 true일 때만 실행
    if (aiTaggingInProgress) {
      const performAiTagging = async () => {
        console.log('AI 태깅 시작...');
        try {
          // 여기에 AI 태깅과 관련된 비동기 로직을 구현
          const taggingResult = await get_tag_v3(product_id);
          console.log('AI 태깅 결과:', taggingResult);
          // 태깅 완료 후 필요한 상태 업데이트
          setAiTaggingInProgress(false); // AI 태깅 작업이 완료되었으므로 진행 중 상태를 false로 설정
        } catch (error) {
          console.error('AI 태깅 중 오류 발생:', error);
          setAiTaggingInProgress(false); // 오류 발생 시에도 진행 중 상태 해제
        }
      };
  
      performAiTagging();
    }
  }, [aiTaggingInProgress, product_id]);
  */
  const checkImageStatus = async () => {

    try {
      const response = await get_tagging_status(product_id);
      if (response.status === 200) {
        setAiTaggingStatus(true);
        setAiTaggingInProgress(false); // AI 태깅 완료 후 상태를 진행 중이 아님으로 설정
      }
    } catch (error) {
      console.error('태깅 상태 확인 중 오류 발생:', error);
      setAiTaggingInProgress(false); // 오류 발생 시에도 진행 중 상태 해제
    }
  };
  // 처음 들어올 때, ai태깅상태 조회하기
    useEffect(() => {
      if (imagePreviewUrl && product_id) {
        setAiTaggingInProgress(true); // AI 태깅 시작 전 상태를 진행 중으로 설정
        fetchData();
        checkImageStatus();
        //fetchData();

      }
    }, [imagePreviewUrl, product_id]);
  
    // AI 태그 버튼 클릭 이벤트 핸들러
    const handleAiTagClick =async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if(aiTaggingStatus&&!aiTaggingInProgress){
        try{
          const tagResult = await get_tag_v3(product_id);
          fetchData()

          if (tagResult.status === 200) {

            const { colors, materials, patterns } = tagResult.data;
    
            // 각 태그 상태 업데이트
            setSelectedColors(colors.map(color => color.name)); // 색상 이름 배열로 변환하여 상태 업데이트
            setSelectedMaterials(materials.map(material => material.name)); // 재질 이름 배열로 변환하여 상태 업데이트
            setSelectedPatterns(patterns.map(pattern => pattern.name)); // 패턴 이름 배열로 변환하여 상태 업데이트
          }
        }catch(error){
          console.error("태깅가져오기 실패",error)
        }finally{
          setAiTaggingInProgress(false); 
        }

      }
      else{
        setAiTaggingInProgress(true);
        checkImageStatus();
      }
      // AI 태깅 로직 구현
    };

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


  // 제출
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
      materials: selectedMaterials,
      patterns: selectedPatterns,
    };

    formData.append('data', JSON.stringify(jsonData));
    try {
      const response = await uploadClothesImage(formData)
      if (response.status==200) {
        //alert('성공');
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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


  const category = [
    { m_category: '상의', s_category: ['티셔츠', '니트/스웨터', '셔츠', '블라우스', '맨투맨/스웨트셔츠', '후드', '민소매/슬리브리스'] },
    { m_category: '원피스/점프수트', s_category: ['캐주얼 원피스', '미니원피스', '티셔츠 원피스', '셔츠 원피스', '맨투맨/후드 원피스', '니트 원피스', '자켓 원피스', '멜빵 원피스', '점프수트', '파티/이브닝 원피스', '기타'] },
    { m_category: '바지', s_category: ['반바지', '청바지', '긴바지', '정장바지', '운동복', '레깅스', '기타'] },
    { m_category: '스커트', s_category: ['미니', '미디', '롱', '기타'] },
    { m_category: '아우터', s_category: ['카디건', '재킷', '레더재킷', '트위드재킷', '코트', '숏패딩', '롱패딩', '경량 패딩', '트렌치코트', '사파리/헌팅재킷', '점퍼', '무스탕', '베스트', '레인코트'] }
  ];





  const handleMainCategorySelect = (mCategory) => {
    setMainCategory(mCategory);
    setSubCategories(category.find((c) => c.m_category === mCategory).s_category);
    setSelectedSub(''); // 서브 선택 초기화
    mCategoryInput.current.value = mCategory;
  };

  const handleSubCategorySelect = (sCategory) => {
    setSelectedSub(sCategory);
    sCategoryInput.current.value = sCategory;
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
            <button
              className={`ai-tag-button ${aiTaggingStatus ? 'bg-green-500' : 'bg-gray-500'}`}
              onClick={handleAiTagClick}
              style={{
                color: 'white',
                padding: '6px 12px',
                margin: '4px 0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {aiTaggingInProgress ? 'AI 태그 분석 중...' : 'AI 태그'}
            </button>
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
        <input className="w-80 mx-3 border-b-2 border-gray-100 my-1 " type="text" ref={nameInput} placeholder="이름을 입력하세요" required />

        {/* <hr className="my-12 border-gray-200" /> */}
        <div className="mt-3 mx-3 text-lg font-semibold">브랜드</div>
        <input className="w-80 mx-3 border-b-2 border-gray-100 my-1" type="text" ref={brandInput} placeholder="브랜드를 입력하세요" required />


        {/* 주 카테고리 선택 버튼 */}
        <div className="mx-3 my-3">
          <p className="text-lg font-semibold my-2 mt-4">주 카테고리</p>
          <div className="flex flex-wrap gap-2">
            {category.map((c) => (
              <button
                key={c.m_category}
                className={`py-1 px-4 rounded-lg ${mainCategory === c.m_category ? 'bg-main text-white' : 'bg-gray-200'}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMainCategorySelect(c.m_category);
                }}
              >
                {c.m_category}
              </button>
            ))}
          </div>
          <input type="hidden" ref={mCategoryInput} value={mainCategory} />
        </div>

        {/* 부 카테고리 선택 버튼 */}
        <div className="mx-3 my-3">
          <p className="text-lg font-semibold mb-2">부 카테고리</p>
          <div className="flex flex-wrap gap-2">
            {subCategories.map((sCategory) => (
              <button
                key={sCategory}
                className={`py-1 px-4 rounded-lg ${selectedSub === sCategory ? 'bg-main text-white' : 'bg-gray-200'}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubCategorySelect(sCategory);
                }}
                disabled={!mainCategory}
              >
                {sCategory}
              </button>
            ))}
          </div>
          <input type="hidden" ref={sCategoryInput} value={selectedSub} />
        </div>



        <hr className="my-3 mt-5 border-gray-200" />
        <div onClick={() => setDropdownOpenColor(!dropdownOpenColor)}>
          <div className="mx-3 flex justify-between items-center">
            <p className="text-lg font-semibold cursor-pointer w-20" onClick={toggleDropdown}>
              색상
            </p>
            <div className="flex-grow text-right min-w-0">
              {selectedColors.length > 0 ? (
                <p className="mr-2 text-base font-medium text-quaternary truncate">
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
          <div className="flex flex-wrap mx-4 my-3 gap-2 items-center">
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



        <hr className="my-4 border-gray-200" />
        <div onClick={() => setDropdownOpenMaterial(!dropdownOpenMaterial)}>
          <div className="mx-3 flex justify-between items-center">
            <p className="text-lg font-semibold cursor-pointer w-20">
              소재
            </p>
            <div className="flex-grow text-right min-w-0">
              {selectedMaterials.length > 0 ? (
                <p className="mr-2 text-base font-medium text-quaternary truncate">
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

          <div className="flex flex-wrap mx-4 my-3 gap-2 items-center">
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


        <hr className="my-4 border-gray-200" />
        <div onClick={() => setDropdownOpenPattern(!dropdownOpenPattern)}>
          <div className="mx-3 flex justify-between items-center">
            <p className="text-lg font-semibold cursor-pointer w-20">
              패턴
            </p>
            <div className="flex-grow text-right min-w-0">
              {selectedPatterns.length > 0 ? (
                <p className="mr-2 text-base font-medium text-quaternary truncate">
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

          <div className="flex flex-wrap mx-4 my-3 gap-2 items-center">
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