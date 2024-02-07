import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";

/**
 * 카테고리 내 의류 목록을 포함하는 component를 생성합니다
 * 
 * - className: 내부 ListGroup에 적용할 className 속성
 * - clothes: 표시할 옷들의 배열
 * - categorySetter: 뒤로가기 선택 시 category를 설정할 함수
 * - clothesIdSetter: 옷 선택 시 clothesId를 설정할 함수
 * 
 * @returns 생성된 JSX component
 */
export default function ClothesList({ className, clothes, categorySetter, clothesIdSetter }) {
	return (
		<ListGroup className={className ? className : ""}>
			{
				clothes ? (
					<>
						<ListItem
							className="flex flex-row gap-2 items-center"
							onClick={() => { categorySetter(undefined) }}
						>
							<ArrowUturnLeftIcon className="size-4" />
							뒤로가기
						</ListItem>
						{
							clothes.map(
								(clothing) => (
									<ListItem
										key={clothing.clothe_id}
										onClick={() => clothesIdSetter(clothing.clothe_id)}
									>
										{clothing.name}
									</ListItem>
								)
							)
						}
					</>
				) : ""
			}
		</ListGroup>
	);
}
