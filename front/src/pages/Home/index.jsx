import TopBar from "../../components/TopBar";
import LiveScrollPane from "./LiveScrollPane";
import Title from "./Title";
import LiveThumbnail from "../../components/LiveThumbnail";

function Home() {
	return (
		<>
			<TopBar title={<Title />} />

			<div className="flex flex-col gap-2 pt-4">
				<LiveScrollPane
					components={
						[
						]
					}
				/>
			</div>
		</>
	);
}

export default Home;
