import { Link } from "react-router-dom";

function LookThumbnail({ image, post, user, badge, action }) {
	return (
		<div className="flex flex-col w-40 shadow-md rounded-lg">
			<Link
				className={`flex-none w-40 h-64 relative rounded-t-lg ${action ? "" : "rounded-b-lg"}`}
				to={post}
			>
				<img className={`w-40 h-64 object-cover rounded-t-lg ${action ? "" : "rounded-b-lg"}`} src={image} />
				{
					badge ? (
						<div className="absolute top-2 right-2 bg-black/70 rounded-lg">
							{badge}
						</div>
					) : ""
				}
				<div className={`absolute bottom-0 left-0 right-0 bg-black/70 ${action ? "" : "rounded-b-lg"}`}>
					{user}
				</div>
			</Link>
			{
				action ? (
					<div className="flex-auto">
						{action}
					</div>
				) : ""
			}
		</div>
	);
}

export default LookThumbnail;
