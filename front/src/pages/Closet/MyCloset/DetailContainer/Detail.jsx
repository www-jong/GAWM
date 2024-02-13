import { useId, useState } from "react";
import ListItem from "../../../../components/ListGroup/ListItem";

/**
 * 옷 세부 페이지의 한 속성을 표시하는 component를 생성합니다
 * 
 * - label: 속성의 이름
 * - name: 속성의 name 값
 * - value: 속성의 값 (단일 값 또는 배열)
 * - isEditing: 현재 편집 중인지 확인
 * - multiple: 속성 존재 시 다중 선택 편집
 *  
 * @returns 생성된 JSX component
 */
export default function Detail({ label, name, value, isEditing }) {
	const id = useId();

	const Checkbox = ({ name, value, defaultChecked }) => {
		const [checked, setChecked] = useState(defaultChecked);

		return (
			<label className={`py-1 px-4 rounded-lg ${checked ? "bg-main text-white" : "bg-gray-200"}`}>
				<input className="hidden" type="checkbox" name={name} checked={value} onChange={() => setChecked(!checked)} />
				{value}
			</label>
		);
	};

	return (
		<ListItem div noHover className="flex flex-col gap-2">
			{
				isEditing ? (
					<>
						<label className="flex-none font-bold" htmlFor={id}>{label}</label>
						<div className="self-stretch flex flex-row flex-wrap items-center gap-1">
							{
								"multiple" in arguments[0] && Array.isArray(value) ? (
									value.map(
										(item) => (
											<Checkbox key={`${name}-${item}`} name={name} value={item} defaultChecked={true} />
										)
									)
								) : <input id={id} className="-mx-1 px-1 py-1 w-full" type="text" required placeholder={label} />
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
										(item) => <span className="text-[#767676] p-1 bg-[#efefef] rounded-lg" key={item}>{item}</span>
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
