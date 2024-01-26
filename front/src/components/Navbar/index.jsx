import NavItem from "./NavItem";

import ActivityIcon from "../../assets/navbar/Activity.svg";
import ClosetIcon from "../../assets/navbar/Closet.svg";
import HomeIcon from "../../assets/navbar/Home.svg";
import ProfileIcon from "../../assets/navbar/Profile.svg";
import GawmIcon from "../../assets/Gawm.svg";

function Navbar() {
	return (
		<nav className="container mx-auto">
			<div className="flex flex-row justify-around">
				<NavItem icon={HomeIcon} name="홈" href="/" />
				<NavItem icon={ActivityIcon} name="내감어때" href="/" />
				<NavItem icon={GawmIcon} name="26°C 라이브" href="/" />
				<NavItem icon={ClosetIcon} name="내 옷장" href="/" />
				<NavItem icon={ProfileIcon} name="MY" href="/" />
			</div>
		</nav>
	);
}

export default Navbar;
