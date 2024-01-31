import Mascot from "../../assets/images/Mascot.svg";
import CoolMascot from "../../assets/images/CoolMascot.svg";

function Action({ active = false }) {
	return (
		<button className={`group w-full h-8 px-auto flex justify-center items-center gap-1 ${active ? "active bg-[#fbc6ba]" : "bg-[#f0eeee]"} rounded-b-lg`}>
			{
				active ? (
					<>
						<img className="flex-none h-4" src={CoolMascot} />
						<span className="flex-none font-pretendard text-xs">감 있어요!</span>
					</>
				) : (
					<>
						<img className="flex-none h-4" src={Mascot} />
						<span className="flex-none font-pretendard text-xs">감 있나요?</span>
					</>
				)
			}
		</button>
	);
}

export default Action;
