/**
 * 여러 개의 ListItem을 포함할 수 있는 컨테이너를 반환합니다
 * 
 * - children: 컨테이너 내부의 요소
 * 
 * @returns 생성된 JSX component
 */
export default function ListGroup({ children }) {
	return (
		<ul className="list-none grid grid-cols-1 divide-y">
			{children}
		</ul>
	);
}
