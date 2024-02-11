import DetailContainer from "./DetailContainer";
import { useEffect, useState } from "react";
import { getClothesInfo } from "../../../apis/clothes";
import Overlay from "./Overlay";
import CenteredTopBar from "../../MyPage/CenteredTopBar";
import AdaptiveContainer from "../../../components/AdaptiveContainer";
import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";
import { TrashIcon } from "@heroicons/react/24/outline";

/**
 * 옷의 상세정보를 표시하는 component를 생성합니다
 * 
 * - clothesId: 옷 ID
 * - clothesIdSetter: 뒤로가기 클릭 시 clothesId를 설정할 함수
 * - onDelete: 옷 삭제 시 실행할 함수
 * 
 * @returns 생성된 JSX component
 */
export default function ClothesDetail({ clothesId, clothesIdSetter, onDelete }) {
	const [clothes, setClothes] = useState(undefined);

	const testData = {
		8: {
			"data": {
				"data": {
					"clothesId": 8,
					"userId": 1,
					"orderNum": 4,
					"clothesImg": "img_url",
					"mCategory": "Outerwear",
					"sCategory": "Jacket",
					"brand": "Brand A",
					"name": "Outfit 1",
					"colors": ["black", "white"],
					"materials": ["wool", "cotton"],
					"patterns": ["striped"]
				}
			}
		},
		15: {
			"data": {
				"data": {
					"clothesId": 15,
					"userId": 1,
					"orderNum": 3,
					"clothesImg": "img_url",
					"mCategory": "Outerwear",
					"sCategory": "Jacket",
					"brand": "Brand B",
					"name": "Outfit 2",
					"colors": ["blue"],
					"materials": ["polyester"],
					"patterns": ["solid"]
				}
			}
		},
		22: {
			"data": {
				"data": {
					"clothesId": 22,
					"userId": 1,
					"orderNum": 2,
					"clothesImg": "img_url",
					"mCategory": "Innerwear",
					"sCategory": "Blazer",
					"brand": "Brand C",
					"name": "Outfit 3",
					"colors": ["grey", "black"],
					"materials": ["linen", "silk"],
					"patterns": ["checked"]
				}
			}
		}
	};

	// 옷 정보 불러오기
	useEffect(
		() => {
			const fetchClothes = async () => {
				try {
					// TODO: API 연동 시 주소 수정
					const response = await getClothesInfo(clothesId);
					const data = response.data.data;
		
					setClothes(data);
				}
				catch(error) {
					// TODO: API 연동 시 아래 줄 주석 해제 및 테스트 코드 삭제
					// setClothes(null);

					// 테스트 데이터
					setClothes(testData[clothesId].data.data);
				}
			};

			fetchClothes();
		},
		[clothesId]
	);

	// 페이지 container
	const Container = ({ children }) => (
		<Overlay>
			<CenteredTopBar onBacktrack={() => clothesIdSetter(undefined)}>
				<span className="font-pretendard font-semibold">{clothes?.name ? clothes.name : " "}</span>
			</CenteredTopBar>
			<AdaptiveContainer className="mt-12 mb-24">
				{children}
			</AdaptiveContainer>
		</Overlay>
	);
	
	// 옷 데이터가 없는 경우 처리
	if(typeof clothes === "undefined") {
		return (
			<Container>
				<div className="w-full flex flex-row justify-center">
					<span>옷 데이터를 불러오는 중입니다</span>
				</div>
			</Container>
		);
	}
	else if(clothes === null) {
		return (
			<Container>
				<div className="w-full flex flex-row justify-center">
					<span>옷 데이터를 불러오는 데 실패했습니다</span>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<div className="flex flex-col gap-4">
				<div className="flex flex-row justify-center self-center w-full md:w-6/12 lg:w-4/12 xl:w-3/12 aspect-square p-2 bg-[#efefef] rounded-lg">
					<img src={clothes.clothesImg} />
				</div>

				<DetailContainer data={clothes} />

				<div className="flex flex-row justify-start mt-4 px-4">
					<button
						className="hover:bg-red/20 flex flex-row items-center gap-2 px-4 py-2 bg-[#efefef] rounded-lg"
						onClick={
							() => {
								onDelete();
								clothesIdSetter(undefined);
							}
						}
					>
						<TrashIcon className="size-4" />
						<span>삭제</span>
					</button>
				</div>
			</div>
		</Container>
	);
}
