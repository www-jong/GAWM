import { useState } from "react";
import CategoryList from "./CategoryList";
import ClothesList from "./ClothesList";

/**
 * 내 옷장 페이지 내 옷장 영역을 표시하는 요소를 반환합니다
 * 
 * @returns 생성된 JSX component
 */
export default function MyCloset() {
	const [category, setCategory] = useState(undefined);
	const categorySetter = (newCategory) => {
		setCategory(newCategory);
	};

	// 테스트 데이터
	const response = {
		"status": 200,
		"content": [
			{
				"clothes_id": 8,
				"clothes_img": "img_url",
				"name": "Outfit 1",
				"brand": "Brand A",
				"m_category": "Outerwear",
				"s_category": "Jacket",
				"order": 4,
				"colors": [
					"black", "white"
				],
				"materials": [
					"wool", "cotton"
				],
				"patterns": ["striped"],
				"created_at": "timestamp",
				"updated_at": "timestamp"
			},
			{
				"clothes_id": 15,
				"clothes_img": "img_url",
				"name": "Outfit 2",
				"brand": "Brand B",
				"m_category": "Outerwear",
				"s_category": "Coat",
				"order": 3,
				"colors": ["blue"],
				"materials": ["polyester"],
				"patterns": ["solid"],
				"created_at": "timestamp",
				"updated_at": "timestamp"
			},
			{
				"clothes_id": 22,
				"clothes_img": "img_url",
				"name": "Outfit 3",
				"brand": "Brand C",
				"m_category": "Outerwear",
				"s_category": "Blazer",
				"order": 2,
				"colors": [
					"grey", "black"
				],
				"materials": [
					"linen", "silk"
				],
				"patterns": ["checked"],
				"created_at": "timestamp",
				"updated_at": "timestamp"
			},
			{
				"clothes_id": 30,
				"clothes_img": "img_url",
				"name": "Outfit 4",
				"brand": "Brand D",
				"m_category": "Outerwear",
				"s_category": "Windbreaker",
				"order": 1,
				"colors": ["red"],
				"materials": ["nylon"],
				"patterns": ["camo"],
				"created_at": "timestamp",
				"updated_at": "timestamp"
			}
		],
		"isFirst": true,
		"isLast": true,
		"page": 1,
		"totalPage": 1,
		"size": 3,
		"sorted": false,
		"asc": false,
		"filtered": false
	};
	const closet = response.content;

	// "m_category"로 분류
	// ES2024
	const map = Map.groupBy(
		closet, (item) => item["m_category"]
	);

	// Pre-ES2024
	// const map = new Map();
	// for(const item of closet) {
	// 	let list = map.get(item["m_category"]);
	//
	// 	if(list === undefined) {
	// 		list = [];
	// 		map.set(item["m_category"], list);
	// 	}
	// 	list.push(item);
	// }

	return (
		<>
			{
				category ? (
					<ClothesList
						clothes={map.get(category)}
						categorySetter={categorySetter}
					/>
				) : (
					<CategoryList
						categories={Array.from(map.keys())}
						categorySetter={categorySetter}
					/>
				)
			}
		</>
	)
}
