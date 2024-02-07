import { Link } from "react-router-dom";

function User({ username, href, image }) {
	return (
		<Link className="flex" to={href}>
			<div className="flex-none size-5 ml-2.5 mr-1 my-1">
				<img className="size-5 object-cover rounded-full bg-tertiary" src={image} />
			</div>
			<div className="grow mx-1 flex flex-col justify-center truncate">
				<span className="font-nps text-white text-xs">{username}</span>
			</div>
		</Link>
	);
}

export default User;
