function LiveScrollPane({ components }) {
	return (
		<div className="flex gap-4 scroll-pl-4 pr-4 snap-x overflow-x-scroll">
			{
				components.map(
					(component, index) => (
						<div className={`snap-start size-32 ${index ? "" : "ml-4"}`}>{component}</div>
					)
				)
			}
		</div>
	);
}

export default LiveScrollPane;
