import DetailContainer from "./DetailContainer";
import { useEffect, useRef, useState } from "react";
import { getClothesInfo } from "../../../apis/clothes";
import Overlay from "./Overlay";
import CenteredTopBar from "../../MyPage/CenteredTopBar";
import AdaptiveContainer from "../../../components/AdaptiveContainer";
import { CheckIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { fetchUserInfo, useUserStore } from "../../../stores/user";

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
	// 옷 정보
	const [clothes, setClothes] = useState(undefined);

	// 로그인한 사용자 ID
	const { userId } = useUserStore(
		(state) => ({ "userId": state.user?.userId })
	);

	// 옷 정보 <form>
	const form = useRef(null);

	// 편집 상태
	const [isEditing, setIsEditing] = useState(false);
	const isEditingSetter = async () => {
		if(isEditing) {
			// 편집 완료 후 제출
			const data = new FormData(form);
			const payload = {};

			payload["name"] = data.get("name");
			payload["brand"] = data.get("brand");
			payload["m_category"] = data.get("m_category");
			payload["s_category"] = data.get("s_category");
			payload["colors"] = data.getAll("colors");
			payload["materials"] = data.getAll("materials");
			payload["patterns"] = data.getAll("patterns");

			console.log(payload);
		}

		setIsEditing(!isEditing);
	};

	// 옷 정보 불러오기
	const fetchClothes = async () => {
		try {
			const response = await getClothesInfo(clothesId);
			const data = response.data;
			console.log("옷정보:",data)
			setClothes(data);
		}
		catch(error) {
			setClothes(null);
		}
	};

	// 옷 정보 불러오기
	useEffect(
		() => {
			fetchClothes();
			if(!userId) fetchUserInfo();
		},
		[clothesId, userId]
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

				<form ref={form}>
					<DetailContainer
						data={clothes}
						isEditing={isEditing}
					/>

					<div className="flex flex-row justify-start gap-4 mt-4 px-4">
						<button
							className="flex flex-row items-center gap-2 px-4 py-2 bg-[#efefef] rounded-lg"
							onClick={isEditingSetter}
						>
							{
								isEditing ? (
									<>
										<CheckIcon className="size-4" />
										<span>완료</span>
									</>
								) : (
									<>
										<PencilIcon className="size-4" />
										<span>편집</span>
									</>
								)
							}
						</button>

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
				</form>
			</div>
		</Container>
	);
}
