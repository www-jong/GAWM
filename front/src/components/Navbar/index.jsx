import NavItem from "./NavItem";

import ActivityIcon from "../../assets/navbar/Activity.svg";
import ActivitySelectedIcon from "../../assets/navbar/ActivitySelected.svg";
import ClosetIcon from "../../assets/navbar/Closet.svg";
import ClosetSelectedIcon from "../../assets/navbar/ClosetSelected.svg";
import HomeIcon from "../../assets/navbar/Home.svg";
import HomeSelectedIcon from "../../assets/navbar/HomeSelected.svg";
import ProfileIcon from "../../assets/navbar/Profile.svg";
import ProfileSelectedIcon from "../../assets/navbar/ProfileSelected.svg";
import GawmIcon from "../../assets/Gawm.svg";
import { useLocation } from "react-router-dom";
import AdaptiveContainer from "../../components/AdaptiveContainer";

/**
 * 네비게이션 바를 생성합니다
 * 
 * @returns 생성된 Navbar
 */
function Navbar() {
	// 선택된 위치 확인을 위해 사용
	const pathname = useLocation().pathname;
	const matches = {
		"home": pathname === "/",
		"browse": pathname.startsWith("/browse"),
		"live": pathname.startsWith("/live"),
		"closet": pathname.startsWith("/closet"),
		"mypage": pathname.startsWith("/mypage")
	};

	return (
		<AdaptiveContainer className="flex flex-row justify-around">
			<NavItem
				icon={HomeIcon}
				selectedIcon={HomeSelectedIcon}
				name="홈"
				href="/"
				isSelected={matches.home}
			/>
			<NavItem
				icon={ActivityIcon}
				selectedIcon={ActivitySelectedIcon}
				name="내감어때"
				href="/browse"
				isSelected={matches.browse}
			/>
			<NavItem
				icon={GawmIcon}
				name="26°C 라이브"
				href="https://i10e203.p.ssafy.io/gawm/live"
				isSelected={matches.live}
			/>
			<NavItem
				icon={ClosetIcon}
				selectedIcon={ClosetSelectedIcon}
				name="내 옷장"
				href="/closet"
				isSelected={matches.closet}
			/>
			<NavItem
				icon={ProfileIcon}
				selectedIcon={ProfileSelectedIcon}
				name="MY"
				href="/mypage"
				isSelected={matches.mypage}
			/>
		</AdaptiveContainer>
	);
}

export default Navbar;
