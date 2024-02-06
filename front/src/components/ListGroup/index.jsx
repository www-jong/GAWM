/**
 * 여러 개의 ListItem을 포함할 수 있는 컨테이너를 반환합니다
 * 
 * - className: 내부 <ul> 태그에 적용할 class
 * - onClick: 클릭 시 실행할 함수
 * - children: 컨테이너 내부의 요소
 * - div: 속성 존재 시 <div> 생성
 * 
 * @returns 생성된 JSX component
 */
export default function ListGroup({ className, onClick, children }) {
	const appliedClassName = `list-none grid grid-cols-1 divide-y ${className ? className : ""}`;

	if("div" in arguments[0])
		return <div className={appliedClassName} onClick={onClick}>{children}</div>;
	else
		return <ul className={appliedClassName} onClick={onClick}>{children}</ul>;
}
