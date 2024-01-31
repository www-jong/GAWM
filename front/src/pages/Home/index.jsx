import TopBar from "../../components/TopBar";
import LiveScrollPane from "./LiveScrollPane";
import Title from "./Title";
import LiveThumbnail from "../../components/LiveThumbnail";
import TodaysLook from "./TodaysLook";

function Home() {
	return (
		<>
			<div className="px-4 my-2">
				<TopBar title={<Title />} />
			</div>

			<div className="flex flex-col gap-2 pt-4">
				<LiveScrollPane
					components={
						[
						]
					}
				/>
			</div>

			<div className="pt-4 mx-4">
				<TodaysLook />
			</div>
		</>
	);
}

export default Home;
