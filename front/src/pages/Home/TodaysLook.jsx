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
				<LookThumbnail
					image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
					post="#post"
					user={
						<ThumbnailUser
							username="감없는 판다"
							href="#user"
							image="https://upload.wikimedia.org/wikipedia/commons/c/cd/Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG"
						/>
					}
					badge={
						<ThumbnailBadge count={25567} />
					}
					action={<Action active={false} />}
				/>
				<LookThumbnail
					image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
					post="#post"
					user={
						<ThumbnailUser
							username="감없는 판다"
							href="#user"
							image="https://upload.wikimedia.org/wikipedia/commons/c/cd/Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG"
						/>
					}
					badge={
						<ThumbnailBadge count={36678} />
					}
					action={<Action active={true} />}
				/>
			</div>
		</div>
	);
}

export default TodaysLook;
