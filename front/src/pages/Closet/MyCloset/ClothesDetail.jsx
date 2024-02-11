import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import DetailContainer from "./DetailContainer";
import { useEffect, useState } from "react";
import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";
import axios from "axios";
import {getClothesInfo} from "../../../apis/clothes"
/**
 * 옷의 상세정보를 표시하는 component를 생성합니다
 * 
 * - clothesId: 옷 ID
 * - clothesIdSetter: 뒤로가기 클릭 시 clothesId를 설정할 함수
 * 
 * @returns 생성된 JSX component
 */
export default function ClothesDetail({ clothesId, clothesIdSetter }) {
	const [clothes, setClothes] = useState(undefined);

	// 옷 정보 불러오기
	useEffect(
		() => {
			const fetchClothes = async () => {
				try {
					// TODO: API 연동 시 주소 수정
					const response = await getClothesInfo(clothedId);
					const data = response.data.data;
					console.log(data)
					setClothes(data);
				}
				catch(error) {
					// TODO: API 연동 시 아래 줄 주석 해제 및 테스트 코드 삭제
					// setClothes(null);

					// 테스트 코드
					setClothes(
						{
							"status": 200,
							"data": {
								"clothesId": 3,
								"userId": 2,
								"orderNum": 1,
								"clothesImg": `https://gwwmbucket.s3.ap-northeast-2.amazonaws.com/`+"afa8b099-0d8b-4a76-9cea-5a303bdc2288.jpg",
								"brand": "싸피",
								"name": "싸피후드3",
								"colors": [
									"파랑",
									"초록"
								],
								"materials": [
									"면",
									"폴리에스테르"
								],
								"patterns": [],
								"scategory": "후드",
								"mcategory": "아우터"
							}
						}.data
					);
				}
			};

			fetchClothes();
		},
		[clothesId]
	);
	
	// 옷 데이터가 없는 경우 처리
	if(typeof clothes === "undefined")
		return <></>;
	else if(clothes === null) {
		return (
			<ListGroup>
				<ListItem
					className="flex flex-row gap-2 items-center"
					onClick={() => { clothesIdSetter(undefined) }}
					noHover
				>
					<ArrowUturnLeftIcon className="size-4" />
					뒤로가기
				</ListItem>
				<ListItem>옷 데이터를 불러오는 데 실패했습니다</ListItem>
			</ListGroup>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row justify-between items-center">
				<button className="size-6 p-1 hover:bg-primary/20" onClick={() => clothesIdSetter(undefined)}>
					<ArrowUturnLeftIcon className="size-full" />
				</button>
				<h2 className="text-lg font-bold">{clothes.name}</h2>
				<div className="size-5"></div>
			</div>
			<div className="flex flex-row justify-center self-center w-full md:w-6/12 lg:w-4/12 xl:w-3/12 aspect-square p-2 bg-[#efefef] rounded-lg">
				<img src={clothes.clothesImg} />
			</div>

			<DetailContainer data={clothes} />
		</div>
	);
}
