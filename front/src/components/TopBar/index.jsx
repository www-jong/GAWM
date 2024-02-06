function TopBar({ title = "", component = "", action = "" }) {
	return (
		<div className="flex gap-4">
			{
				action ? (
					<div className="">
						{action}
					</div>
				) : ""
			}
			{
				title ? (
					<div className="grow font-nps">
						{title}
					</div>
				) : ""
			}
			{
				component ? (
					<div className="">
						{component}
					</div>
				) : ""
			}
		</div>
	);
}

export default TopBar;
