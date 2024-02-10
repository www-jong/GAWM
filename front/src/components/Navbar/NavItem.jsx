import { Link } from "react-router-dom";

/**
 * Navbar의 한 메뉴를 생성합니다
 * 
 * - icon: 사용하는 아이콘
 * - selectedIcon: 메뉴가 선택되었을 시 표시할 아이콘
 * - name: 메뉴의 이름
 * - href: 메뉴를 클릭할 시 가게 될 링크
 * - isSelected: 현재 메뉴가 선택되었는지 지정
 * 
 * @returns NavItem instance
 */
function NavItem({ icon, selectedIcon = icon, name, href, isSelected }) {
	return (
		<Link className="flex flex-col justify-around flex-none size-14" to={href}>
			<img
				className="size-8 mx-auto"
				src={isSelected? selectedIcon : icon}
				alt={name}
			/>
			<span
				className={`text-center text-[#${isSelected ? "352b29" : "767676"}] text-[0.7rem] tracking-tighter`}
			>
				{name}
			</span>
		</Link>
	);
}

export default NavItem;
