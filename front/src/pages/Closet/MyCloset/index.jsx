import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import ClothesList from "./ClothesList";
import ClothesDetail from "./ClothesDetail";
import { getAllClothesInfo } from "../../../apis/clothes";
import AdaptiveContainer from "../../../components/AdaptiveContainer";

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
	};

	// 업데이트 필요 시 사용하는 카운터
	const [refreshCount, setRefereshCount] = useState(0);
	const refreshCountSetter = () => {
		setRefereshCount(refreshCount + 1);
	}

	// 옷장 정보를 받아오기
	useEffect(
		() => {
			const fetchCloset = async () => {
				try {
					const response = await getAllClothesInfo();
					const data = response.data;

					if(data.length) {
						// "mCategory"로 분류
						setCloset(
							Map.groupBy(data, (item) => item["mcategory"])
						);
					}
					else setCloset(new Map());
				}
				catch(error) {
					clothesIdSetter(undefined);
					categorySetter(undefined);
					setCloset(null);
				}
			};

			fetchCloset();
		},
		[refreshCount]
	);

	// 옷장 데이터가 없는 경우 처리
	if(typeof closet === "undefined")
		return (
			<div className="mt-8 w-full flex flex-row justify-center">
				<span>옷장 데이터를 불러오는 중입니다</span>
			</div>
		);
	else if(closet === null) {
		return (
			<div className="mt-8 w-full flex flex-row justify-center">
				<span>옷장 데이터를 불러오는 데 실패했습니다</span>
			</div>
		);
	}
	else if(closet.size === 0) {
		return (
			<div className="mt-8 w-full flex flex-row justify-center">
				<span>등록된 옷이 없습니다</span>
			</div>
		);
	}

	return (
		<>
			<AdaptiveContainer className="mb-24">
				<CategoryList closet={closet} categorySetter={categorySetter} />
			</AdaptiveContainer>
			{
				clothesId ? (
					<ClothesDetail
						clothesId={clothesId}
						clothesIdSetter={clothesIdSetter}
						onDelete={refreshCountSetter}
					/>
				) : category ? (
					<ClothesList
						categoryName={category}
						clothes={closet.get(category)}
						categorySetter={categorySetter}
						clothesIdSetter={clothesIdSetter}
					/>
				) : ""
			}
		</>
	)
}
