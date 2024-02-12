import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import ClothesList from "./ClothesList";
import ClothesDetail from "./ClothesDetail";
import axios from "axios";
import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";

/**
 * 내 옷장 페이지 내 옷장 영역을 표시하는 요소를 반환합니다
 * 
 * @returns 생성된 JSX component
 */
export default function MyCloset() {
	// 옷장 데이터
	const [closet, setCloset] = useState(undefined);

	// 선택한 카테고리와 옷에 대한 state
	const [category, setCategory] = useState(undefined);
	const [clothesId, setClothesId] = useState(undefined);

	const categorySetter = (newCategory) => {
		setCategory(newCategory);
	};
	const clothesIdSetter = (newClothesId) => {
		setClothesId(newClothesId);
	}

	// 옷장 정보를 받아오기
	useEffect(
		() => {
			const fetchCloset = async () => {
				try {
					// TODO: API 연동 시 주소 수정
					const response = await axios.get("https://ssafyfood-www-jong.koyeb.app/webapp/clothe/list");
					const data = response.data.content;
		
					if(data?.length !== 0) {
						// "m_category"로 분류
						// ES2024
						setCloset(
							Map.groupBy(data, (item) => item["m_category"])
						);
		
						// Pre-ES2024
						// const map = new Map();
						// for(const item of data) {
						// 	let list = map.get(item["m_category"]);
						//
						// 	if(list === undefined) {
						// 		list = [];
						// 		map.set(item["m_category"], list);
						// 	}
						// 	list.push(item);
						// }
						// setCloset(map);
					}
					else setCloset(new Map());
				}
				catch(error) {
					setCloset(null);
				}
			};

			fetchCloset();
		},
		[]
	);

	// 옷장 데이터가 없는 경우 처리
	if(typeof closet === "undefined")
		return <></>;
	else if(closet === null) {
		return (
			<ListItem div noHover>옷장 데이터를 불러오는 데 실패했습니다</ListItem>
		);
	}
	else if(closet.size === 0) {
		return (
			<ListItem div noHover>등록된 옷이 없습니다</ListItem>
		);
	}

	return (
		<>
			{
				clothesId ? (
					<ClothesDetail
						clothesId={clothesId}
						clothesIdSetter={clothesIdSetter}
					/>
				) : (
					category ? (
						<ClothesList
							clothes={closet.get(category)}
							categorySetter={categorySetter}
							clothesIdSetter={clothesIdSetter}
						/>
					) : (
						<CategoryList
							categories={Array.from(closet.keys())}
							categorySetter={categorySetter}
						/>
					)
				)
			}
		</>
	)
}
