/**
 * 여러 개의 ListItem을 포함할 수 있는 컨테이너를 반환합니다
 * 
 * - className: 내부 <ul> 태그에 적용할 class
 * - onClick: 클릭 시 실행할 함수
 * - children: 컨테이너 내부의 요소
 * 
 * @returns 생성된 JSX component
 */
export default function ListGroup({ className, onClick, children }) {
	return (
		<ul
			className={`list-none grid grid-cols-1 divide-y ${className ? className : ""}`}
			onClick={onClick}
		>
			{children}
		</ul>
	);
}
