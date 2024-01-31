import TopBar from "../../components/TopBar";
import LiveScrollPane from "./LiveScrollPane";
import Title from "./Title";
import LiveThumbnail from "../../components/LiveThumbnail";

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
							(
								<LiveThumbnail
									image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
									title="판다 테스트"
									createdDate={new Date(2024, 0, 30, 17, 45)}
									points={1}
								/>
							),
							(
								<LiveThumbnail
									image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
									title="판다 테스트 2"
									createdDate={new Date(2024, 0, 30, 17, 45)}
									points={2}
								/>
							),
							(
								<LiveThumbnail
									image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
									title="판다 테스트 3"
									createdDate={new Date(2024, 0, 30, 17, 45)}
									points={3}
								/>
							),
							(
								<LiveThumbnail
									image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
									title="판다 테스트 4"
									createdDate={new Date(2024, 0, 30, 17, 45)}
									points={4}
								/>
							),
							(
								<LiveThumbnail
									image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
									title="판다 테스트 5"
									createdDate={new Date(2024, 0, 30, 17, 45)}
									points={5}
								/>
							),
							(
								<LiveThumbnail
									image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
									title="판다 테스트 6"
									createdDate={new Date(2024, 0, 30, 17, 45)}
									points={6}
								/>
							),
							(
								<LiveThumbnail
									image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
									title="판다 테스트 7"
									createdDate={new Date(2024, 0, 30, 17, 45)}
									points={7}
								/>
							),
							(
								<LiveThumbnail
									image="https://upload.wikimedia.org/wikipedia/commons/1/19/Giant_Panda.jpg"
									title="판다 테스트 8"
									createdDate={new Date(2024, 0, 30, 17, 45)}
									points={8}
								/>
							)
						]
					}
				/>
			</div>
		</>
	);
}

export default Home;
