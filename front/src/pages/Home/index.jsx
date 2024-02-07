import TopBar from "../../components/TopBar";
import TodaysLook from "./TodaysLook";
import HomeLogo from "../../assets/images/HomeLogo.svg";
import LiveThumbnail from "../../components/LiveThumbnail";
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * 홈페이지 component를 생성합니다
 * 
 * @returns 생성된 JSX component
 */
function Home() {
    const [liveRooms, setLiveRooms] = useState(undefined);

    useEffect(
		() => {
			const fetchLiveRooms = async () => {
				try {
					const response = await axios.get('https://ssafyfood-www-jong.koyeb.app/webapp/live-room/follow/');
					setLiveRooms(response.data.content);
				} catch (error) {
					setLiveRooms(null);
				}
			};
			fetchLiveRooms();
		},
		[]
	);

	return (
		<>
			{/* 제목 영역 */}
			<div className="fixed top-0 left-0 right-0 px-2.5 py-1.5 bg-white">
                <TopBar
					title={
						<>
							<img src={HomeLogo} />
							<span className="sr-only">GAWM</span>
						</>
					}
				/>
            </div>

            <div className="flex flex-col gap-4 mt-12 mb-24 px-2.5">
				{/* 라이브 목록 */}
				<div className="flex gap-4 items-center scroll-pl-4 pr-4 snap-x overflow-x-auto">
					{
						liveRooms ? (
							liveRooms.map(
								(item) => (
									<LiveThumbnail
										key={item.user_id}
										className="size-32"
										image={item.profile_img}
										title={item.name}
										createdDate={new Date(item["시작시간"])}
										points={item.point}
										div
									/>
								)
							)
						) : ""
					}
				</div>

				<div className="">
					<TodaysLook />
				</div>
			</div>
		</>
	);
}

export default Home;
