import { Link } from "react-router-dom";

function NavItem({ icon, name, href }) {
	return (
		<Link className="grid grid-cols-1 flex-none size-14" to={href}>
			<img className="size-8 mx-auto" src={icon} alt={name} />
			<span className="text-center text-[#767676] text-[0.7rem] tracking-tighter">{name}</span>
		</Link>
	);
}

export default NavItem;
