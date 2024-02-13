import { useId, useState } from "react";
import ListItem from "../../../../components/ListGroup/ListItem";

/**
 * 옷 세부 페이지의 한 속성을 표시하는 component를 생성합니다
 * 
 * - label: 속성의 이름
 * - name: 속성의 name 값
 * - value: 속성의 값 (단일 값 또는 배열)
 * - isEditing: 현재 편집 중인지 확인
 * - options: multiple 또는 radio 사용 시 사용 가능한 선택
 * - multiple: 속성 존재 시 다중 선택 편집
 * - radio: 속성 존재 시 radio 편집
 * - onInput: input 또는 change시 호출할 함수
 *  
 * @returns 생성된 JSX component
 */
export default function Detail({ label, name, value, isEditing, options, onInput = (value) => {} }) {
	const id = useId();

	const Radio = ({ name, value, defaultChecked }) => {
		return (
			<label>
				<input className="hidden peer" type="radio" name={name} value={value} defaultChecked={defaultChecked} />
				<span className="peer py-2 px-4 rounded-lg peer-checked:bg-main peer-checked:text-white bg-gray-200">
					{value}
				</span>
			</label>
		);
	};

	const Checkbox = ({ name, value, defaultChecked }) => {
		return (
			<label>
				<input className="hidden peer" type="checkbox" name={name} value={value} defaultChecked={defaultChecked} />
				<span className="peer py-2 px-4 rounded-lg peer-checked:bg-main peer-checked:text-white bg-gray-200">
					{value}
				</span>
			</label>
		);
	};

	return (
		<ListItem div noHover className="flex flex-col gap-2">
			{
				isEditing ? (
					<>
						<label className="flex-none font-bold" htmlFor={id}>{label}</label>
						<div
							className="self-stretch flex flex-row flex-wrap items-center gap-x-2 gap-y-4"
							onChange={"radio" in arguments[0] || "multiple" in arguments[0] ? (event) => onInput(event.target.value) : undefined}
						>
							{
								"radio" in arguments[0] ? (
									options.map(
										(item) => (
											<Radio key={`${name}-${item}`} name={name} value={item} defaultChecked={value.includes(item)} onChange={() => onInput(item)} />
										)
									)
								) : "multiple" in arguments[0] ? (
									options.map(
										(item) => (
											<Checkbox key={`${name}-${item}`} name={name} value={item} defaultChecked={value.includes(item)} onChange={() => onInput(item)} />
										)
									)
								) : <input id={id} className="-mx-1 px-1 py-1 w-full" type="text" required placeholder={label} defaultValue={value} />
							}
						</div>
					</>
				) : (
					<>
						<strong className="flex-none">{label}</strong>
						<div className="grow self-stretch flex flex-row-reverse flex-wrap items-center gap-1">
							{
								Array.isArray(value) ? (
									value.map(
										(item) => <span className="text-[#767676] p-1 bg-[#efefef] rounded-lg" key={item} name={name}>{item}</span>
									)
								) : <span className="text-[#767676]">{value}</span>
							}
						</div>
					</>
				)
			}
		</ListItem>
	);
}
