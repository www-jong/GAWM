import { Link } from "react-router-dom";

/**
 * 리스트 중 하나의 아이템을 표시하는 컨테이너를 반환합니다
 * 
 * - className: 내부 <li> 태그에 적용할 class
 * - onClick: 클릭 시 실행할 함수
 * - children: 컨테이너 내부의 요소
 * - href: 링크화 시 가리킬 주소
 * - button: 속성 존재 시 컴포넌트 버튼화
 * - link: 속성 존재 시 컴포넌트 링크화
 * - div: 속성 존재 시 <div> 생성
 * - noHover: hover 시 배경색 변경 비활성화
 * 
 * @returns 생성된 JSX component
 */
export default function ListItem({ className, onClick, children, href }) {
	let element = children;

	// 컴포넌트 생성 시 특정 속성을 넘겼는지 확인 후 버튼 또는 링크화
	// 1. <ListItem button>...</ListItem>
	if("button" in arguments[0])
		element = <button>{children}</button>;
	// 2. <ListItem link href="...">...</ListItem>
	else if("link" in arguments[0])
		element = <Link to={href}>{children}</Link>
	
	const appliedClassName = `p-4 ${"noHover" in arguments[0] ? "" : "hover:bg-primary/20 "}${className ? className : ""}`;

	// 컴포넌트 생성 시 특정 속성을 넘겼는지 확인 후 버튼 또는 링크화
	if("div" in arguments[0])
		return <div className={appliedClassName} onClick={onClick}>{children}</div>;
	else if("button" in arguments[0])
		return <button className={appliedClassName} onClick={onClick}>{children}</button>;
	else if("link" in arguments[0])
		return <Link className={appliedClassName} to={href} onClick={onClick}>{children}</Link>
	else
		return <li className={appliedClassName} onClick={onClick}>{children}</li>;
}
