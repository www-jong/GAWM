import { useLocation } from "react-router-dom";
import AdaptiveContainer from "../../../components/AdaptiveContainer";
import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";
import CenteredTopBar from "../CenteredTopBar";

/**
 * 계정의 각 속성 수정 페이지를 생성합니다
 * 
 * @returns 생성된 PropertySetter 객체
 */
export default function PropertySetter() {
	// 속성 지정
	const properties = [
		{
			"path": "/nickname",
			"name": "nickname",
			"label": "닉네임",
			"type": "text",
			"value": undefined
		},
		{
			"path": "/gender",
			"name": "gender",
			"label": "성별",
			"type": "radio",
			"options": [
				{ "name": "none", "label": "미선택" },
				{ "name": "female", "label": "여성" },
				{ "name": "male", "label": "남성" }
			],
			"value": undefined
		},
		{
			"path": "/age",
			"name": "age",
			"label": "나이",
			"type": "number",
			"value": undefined
		}
	];

	// URL 위치로 수정할 속성 확인
	const pathname = useLocation().pathname;
	let property = undefined;
	for(const item of properties) {
		if(pathname.endsWith(item.path)) {
			property = item;
			break;
		}
	}

	// TODO: 현재 속성을 받아와 property에 적용

	let input = (
		<input
			type={property.type}
			name={property.name}
			id={property.name}
			className="mt-2 block w-full rounded-lg border-0 p-4 ring-1 ring-inset ring-gray-300 placeholder:text-[#767676] focus:ring-2 focus:ring-inset focus:ring-[#767676] text-base lg:text-lg sm:leading-6"
			placeholder={property.label}
		/>
	);

	// 수정할 속성 type이 radio인 경우 추가 처리
	if(property.type === "radio") {
		input = (
			<ListGroup div>
				{
					property.options.map(
						(option) => (
							<ListItem div noHover className="p-0">
								<label className="flex flex-row gap-2 py-4">
									<input
										type={property.type}
										name={property.name}
										id={`${property.name}-${option.name}`}
										value={property.name}
									/>
									<span>{option.label}</span>
								</label>
							</ListItem>
						)
					)
				}
			</ListGroup>
		);
	}

	if(!property) return <></>;
	return (
		<>
			<CenteredTopBar backtrackTo="/mypage/settings">
				{property.label} 설정
			</CenteredTopBar>

			<AdaptiveContainer className="mt-12 mb-24">
				<form className="flex flex-col gap-4 px-4">
					{input}
					<ListItem div noHover className="px-0 py-2">
						<button type="submit" className="py-2 px-8 bg-[#efefef] rounded-lg text-lg">저장</button>
					</ListItem>
				</form>
			</AdaptiveContainer>
		</>
	);
}
