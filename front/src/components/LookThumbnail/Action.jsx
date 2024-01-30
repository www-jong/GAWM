import Mascot from "../../assets/images/Mascot.svg";

function Action() {
	return (
		<button className="w-full px-auto py-2 flex justify-center gap-1 bg-[#f0eeee] rounded-b-lg">
			<img className="flex-none" src={Mascot} />
			<span className="flex-none font-pretendard text-xs">감 있나요?</span>
		</button>
	);
}

export default Action;
