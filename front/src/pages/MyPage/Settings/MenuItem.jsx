import ListItem from "../../../components/ListGroup/ListItem";

/**
 * 설정 페이지 내 메뉴 item을 생성합니다
 * 
 * - children: 페이지 이름
 * - href: 클릭 시 이동 할 링크
 * - icon: item에 사용할 icon
 * 
 * @returns 생성된 JSX component
 */
export default function MenuItem({ children, href, icon }) {
	return (
		<ListItem link href={href} className="flex flex-col gap-4">
			<span>{icon}</span>
			<span>{children}</span>
		</ListItem>
	);
}
