import { useEffect, useState } from "react";
import ListGroup from "../../../../components/ListGroup";
import Detail from "./Detail";

/**
 * 옷의 세부 정보를 표시하는 component를 생성합니다
 * 
 * - data: 옷의 세부 정보
 * - isEditing: 현재 편집 중인지 확인
 * 
 * @returns 생성된 JSX component
 */
export default function DetailContainer({ data, isEditing = false }) {
	const [mcategory, setMcategory] = useState(data.mcategory);
	const [scategory, setScategory] = useState(data.scategory);

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

	const subcategorySetter = () => {
		for(const subcategory of category) {
			if(subcategory.m_category === mcategory)
				return subcategory.s_category;
		}
		return [];
	};

	const patternsArray = ['무지', '체크', '스트라이프', '프린트', '도트', '애니멀', '플로럴', '트로피칼', '페이즐리', '아가일', '밀리터리', '기타'];
	const materialsArray = [
		'면', '린넨', '폴리에스테르', '니트', '울', '퍼', '트위드', '나일론', '데님', '가죽', '스웨이드', '벨벳', '쉬폰', '실크', '코듀로이', '레이스', '기타'
	];

	const mappedMainCategory = category.map((item) => item.m_category);
	const [mappedSubcategory, setMappedSubcategory] = useState(subcategorySetter());
	const mappedColors = colorsArray.map((item) => item.name);

	useEffect(
		() => {
			data.scategory = "";
			setMappedSubcategory(subcategorySetter());
		},
		[mcategory]
	);

	const mcategorySetter = (mcategory) => {
		setMcategory(mcategory);
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
			<Detail label="소재" name="materials" value={data.materials ? data.materials : []} isEditing={isEditing} multiple options={patternsArray} />
			<Detail label="패턴" name="patterns" value={data.patterns ? data.patterns : []} isEditing={isEditing} multiple options={materialsArray} />
		</ListGroup>
	);
}
