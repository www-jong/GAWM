import ListItem from "../../../../components/ListGroup/ListItem";

/**
 * 옷 세부 페이지의 한 속성을 표시하는 component를 생성합니다
 * 
 * - label: 속성의 이름
 * - value: 속성의 값 (단일 값 또는 배열)
 *  
 * @returns 생성된 JSX component
 */
export default function Detail({ label, value }) {
	return (
		<ListItem noHover>
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
		</ListItem>
	);
}
