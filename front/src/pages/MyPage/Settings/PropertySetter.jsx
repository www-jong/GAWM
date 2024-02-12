import { useId, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdaptiveContainer from "../../../components/AdaptiveContainer";
import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";
import { updateUserInfo, useUserStore } from "../../../stores/user";
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
			"pattern": "^[a-z|A-Z|가-힣| |_|0-9]*$",
			"value": undefined,
			"setValue": undefined
		},
		{
			"path": "/gender",
			"name": "gender",
			"label": "성별",
			"type": "radio",
			"options": [
				{ "name": "NONE", "label": "미선택" },
				{ "name": "FEMALE", "label": "여성" },
				{ "name": "MALE", "label": "남성" }
			],
			"value": undefined,
			"setValue": undefined
		},
		{
			"path": "/age",
			"name": "age",
			"label": "나이",
			"type": "number",
			"value": undefined,
			"setValue": undefined
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

	// 정해지지 않은 URL 사용 시 빈 element 반환
	if(!property) return <></>;

	// user store에서 현재 값 가져오기
	const initialValue = useUserStore((state) => state[property.name]);
	[property.value, property.setValue] = useState(initialValue);

	// 서버 요청 실패 시 표시할 메시지
	const [errorMessage, setErrorMessage] = useState(undefined);
	const errorMessageSetter = (message) => {
		setErrorMessage(message);
		setTimeout(
			() => { setErrorMessage(undefined); },
			5000
		);
	}

	// 저장 시 실행할 함수
	const onSubmit = async (event) => {
		event.preventDefault();
		
		if (initialValue === property.value)
			return;

		const payload = {};
		payload[property.name] = property.value;

		try {
			await updateUserInfo(payload);
			useNavigate("/mypage/settings");
		}
		catch(error) {
			if(error?.response?.data?.message)
				errorMessageSetter(error.response.data.message);
		}
	};

	let input = (
		<input
			type={property.type}
			name={property.name}
			id={useId()}
			className="mt-2 block w-full rounded-lg border-0 p-4 ring-1 ring-inset ring-gray-300 placeholder:text-[#767676] focus:ring-2 focus:ring-inset focus:ring-[#767676] text-base lg:text-lg sm:leading-6"
			placeholder={property.label}
			pattern={property?.pattern}
			value={property.value}
			onInput={event => property.setValue(event.target.value)}
		/>
	);

	// 수정할 속성 type이 radio인 경우 추가 처리
	if(property.type === "radio") {
		input = (
			<ListGroup div>
				{
					property.options.map(
						(option) => (
							<ListItem key={option.name} div noHover className="p-0">
								<label className="flex flex-row gap-2 py-1">
									<input
										type={property.type}
										name={property.name}
										id={useId()}
										value={option.name}
										checked={property.value === option.name}
										onChange={event => property.setValue(event.target.value)}
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

	return (
		<>
			<CenteredTopBar backtrackTo="/mypage/settings">
				{property.label} 설정
			</CenteredTopBar>

			<AdaptiveContainer className="mt-12 mb-24">
				<form
					className="flex flex-col gap-4 px-4"
					onSubmit={onSubmit}
				>
					{input}
					<ListItem div noHover className="px-0 py-2 flex flex-row gap-4 items-center">
						<button
							type="submit"
							className={`flex-none py-2 px-8 bg-[#efefef] rounded-lg text-lg ${(initialValue === property.value || !property.value) ? "text-[#767676]" : ""}`}
							disabled={initialValue === property.value || !property.value}
						>
							저장
						</button>
						{
							errorMessage ? (
								<span className="text-red">{errorMessage}</span>
							) : ""
						}
					</ListItem>
				</form>
			</AdaptiveContainer>
		</>
	);
}
