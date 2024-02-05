import Mascot from "../../assets/images/Mascot.svg";

function Badge({ count }) {
	const formatter = new Intl.NumberFormat(
		"ko-KR",
		{
			"maximumFractionDigits": 1,
			"notation": "compact"
		}
	);

	return (
		<div className="flex mx-1.5 my-1 gap-1">
			<img className="flex-none w-4" src={Mascot} />
			<span className="flex-auto font-pretendard text-white text-xs">{formatter.format(count)}</span>
		</div>
	);
}

export default Badge;
