/**
 * 리스트 중 하나의 아이템을 표시하는 컨테이너를 반환합니다
 * 
 * - children: 컨테이너 내부의 요소
 * - href: 링크화 시 가리킬 주소
 * - button: 속성 존재 시 컴포넌트 버튼화
 * - link: 속성 존재 시 컴포넌트 링크화
 * 
 * @returns 생성된 JSX component
 */
export default function ListItem({ children, href }) {
	let element = children;

	// 컴포넌트 생성 시 특정 속성을 넘겼는지 확인 후 버튼 또는 링크화
	// 1. <ListItem button>...</ListItem>
	if("button" in arguments[0])
		element = <button>{children}</button>;
	// 2. <ListItem link href="...">...</ListItem>
	else if("link" in arguments[0])
		element = <a href={href}>{children}</a>
	
	return (<li className="px-4 py-2 hover:bg-primary/20">{element}</li>);
}
