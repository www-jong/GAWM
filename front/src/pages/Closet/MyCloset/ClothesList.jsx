import { useState } from "react";
import AdaptiveContainer from "../../../components/AdaptiveContainer";
import CenteredTopBar from "../../MyPage/CenteredTopBar";
import Overlay from "./Overlay";

/**
 * 세부 카테고리를 표시하는 버튼을 생성합니다
 * 
 * - subcategory: 카테고리의 이름
 * - subcategorySetter: 클릭 시 호출할 함수
 * - selected: 버튼이 선택되었는지 확인
 * 
 * @returns 생성된 버튼
 */
function SubcategoryButton({ subcategory, subcategorySetter, selected }) {
	return (
		<button className={`flex-none px-4 py-2 ${selected ? "text-tertiary border-b-2 border-tertiary" : "text-[#d9d9d9]"}`} onClick={() => subcategorySetter(subcategory)}>
			{subcategory}
		</button>
	);
}

/**
 * 세부 카테고리 내 옷을 표시하는 요소를 생성합니다
 * 
 * - name: 옷 이름
 * - image: 옷 이미지 URL
 * - clothesIdSetter: 옷을 선택했을 시 호출할 함수
 * 
 * @returns 생성된 요소
 */
function ClothesThumbnail({ name, image, clothesIdSetter }) {
	return (
		<div
			className="aspect-[3/4] flex flex-col px-4 pt-4 gap-2 cursor-pointer outline outline-1 outline-offset-0 outline-[#efefef]"
			onClick={clothesIdSetter}
		>
			<div
				style={{ "--image-url": `url(${import.meta.env.VITE_CLOTHES_BASE_URL}/${image})` }}
				className="grow self-stretch bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
			/>
			<div className="flex-none pb-2 self-start">{name}</div>
		</div>
	);
}

/**
 * 카테고리 내 의류 목록을 포함하는 component를 생성합니다
 * 
 * - clothes: 표시할 옷들의 배열
 * - categorySetter: 뒤로가기 선택 시 category를 설정할 함수
 * - clothesIdSetter: 옷 선택 시 clothesId를 설정할 함수
 * 
 * @returns 생성된 JSX component
 */
export default function ClothesList({ categoryName, clothes, categorySetter, clothesIdSetter }) {
	// 카테고리 별 분류
	const [subcategory, setSubcategory] = useState(null);
	const mappedClothes = Map.groupBy(clothes, (item) => item["scategory"]);

	const list = subcategory ? mappedClothes.get(subcategory) : clothes;

	return (
		<Overlay>
			<CenteredTopBar onBacktrack={() => categorySetter(undefined)}>
				<span className="font-pretendard font-semibold">{categoryName}</span>
			</CenteredTopBar>

			<AdaptiveContainer className="mt-12 mb-24">
				<div className="flex flex-row justify-start border-b-[1px] snap-x overflow-x-auto">
					<SubcategoryButton
						subcategory="전체"
						subcategorySetter={() => setSubcategory(null)}
						selected={subcategory === null}
					/>
					{
						Array.from(
							mappedClothes.keys()
						).map(
							(item) => (
								<SubcategoryButton
									key={item}
									subcategory={item}
									subcategorySetter={() => setSubcategory(item)}
									selected={subcategory === item}
								/>
							)
						)
					}
				</div>

				<div className="grid grid-cols-3 lg:grid-cols-4 gap-[1px] mt-4">
					{
						list.map(
							(item) => (
								<ClothesThumbnail
									key={item.clothesId}
									name={item.name}
									clothes={item}
									clothesIdSetter={() => clothesIdSetter(item.clothesId)}
									image={item.clothesImg}
								/>
							)
						)
					}
				</div>
			</AdaptiveContainer>
		</Overlay>
	);
}
