import { useEffect, useState } from "react";
import ListGroup from "../../../../components/ListGroup";
import Detail from "./Detail";
import {get_alltag} from "../../../../apis/clothes"
/**
 * 옷의 세부 정보를 표시하는 component를 생성합니다
 * 
 * - data: 옷의 세부 정보
 * - isEditing: 현재 편집 중인지 확인
 * 
 * @returns 생성된 JSX component
 */
export default function DetailContainer({ data, isEditing = false }) {
	const [mcategory, setMcategory] = useState(data.mcategory || '');
	const [scategory, setScategory] = useState(data.scategory || '');
	const [colorsArray, setColorsArray] = useState([]);
	const [patternsArray,setPatternsArray]=useState([]);
	const [materialsArray, setMaterialsArray] = useState([]);

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

	  useEffect(() => {
		if (data) {
		  fetchData();
		}
	  }, []);
	const category = [
		{ m_category: '상의', s_category: ['티셔츠', '니트/스웨터', '셔츠', '블라우스', '맨투맨/스웨트셔츠', '후드', '민소매/슬리브리스'] },
		{ m_category: '원피스/점프수트', s_category: ['캐주얼 원피스', '미니원피스', '티셔츠 원피스', '셔츠 원피스', '맨투맨/후드 원피스', '니트 원피스', '자켓 원피스', '멜빵 원피스', '점프수트', '파티/이브닝 원피스', '기타'] },
		{ m_category: '바지', s_category: ['반바지', '청바지', '긴바지', '정장바지', '운동복', '레깅스', '기타'] },
		{ m_category: '스커트', s_category: ['미니', '미디', '롱', '기타'] },
		{ m_category: '아우터', s_category: ['카디건', '재킷', '레더재킷', '트위드재킷', '코트', '숏패딩', '롱패딩', '경량 패딩', '트렌치코트', '사파리/헌팅재킷', '점퍼', '무스탕', '베스트', '레인코트'] }
	];

	const subcategorySetter = () => {
		for(const subcategory of category) {
			if(subcategory.m_category === mcategory)
				return subcategory.s_category;
		}
		return [];
	};


	const mappedMainCategory = category.map((item) => item.m_category);
	const [mappedSubcategory, setMappedSubcategory] = useState(subcategorySetter());
	const mappedColors = colorsArray.map((item) => item.name);

	useEffect(
		() => {
			//data.scategory = "";
			setMappedSubcategory(subcategorySetter());
		},
		[mcategory]
	);

	const mcategorySetter = (selectedMcategory) => {
		setMcategory(selectedMcategory);
	  };
	const scategorySetter = (scategory) => {
		setScategory(scategory);
	};

	return (
		<ListGroup div>
			<Detail label="이름" name="name" value={data.name} isEditing={isEditing} />
			<Detail label="브랜드" name="brand" value={data.brand} isEditing={isEditing} />
			<Detail label="주 카테고리" name="m_category" value={mcategory} isEditing={isEditing} radio options={mappedMainCategory} onInput={mcategorySetter} />
			<Detail label="부 카테고리" name="s_category" value={scategory} isEditing={isEditing} radio options={mappedSubcategory} onInput={scategorySetter} />
			<Detail label="색상" name="colors" value={data.colors ? data.colors : []} isEditing={isEditing} multiple options={mappedColors} />
			<Detail label="패턴" name="patterns" value={data.patterns ? data.patterns : []} isEditing={isEditing} multiple options={materialsArray} />
			<Detail label="소재" name="materials" value={data.materials ? data.materials : []} isEditing={isEditing} multiple options={patternsArray} />
		</ListGroup>
	);
}
