import LookThumbnail from "../../components/LookThumbnail";
import TopBar from "../../components/TopBar";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import ThumbnailUser from "../../components/LookThumbnail/User";
import ThumbnailBadge from "../../components/LookThumbnail/Badge";
import Action from "../../components/LookThumbnail/Action";

function TodaysLook() {
	return (
		<div className="flex flex-col justify-start gap-2">
			<TopBar
				title={
					<div className="flex gap-2">
						<h1 className="self-center font-nps text-lg font-bold text-main">오늘의 감각</h1>
						<button className="flex-none self-center bg-[#f0eeee] text-main hover:bg-main hover:text-[#f0eeee] rounded-lg size-6 p-1">
							<ArrowPathIcon />
						</button>
					</div>
				}
			/>

			<div className="flex justify-around">
			</div>
		</div>
	);
}

export default TodaysLook;
