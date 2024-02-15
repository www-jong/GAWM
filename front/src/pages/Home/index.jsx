import TopBar from "../../components/TopBar";
import TodaysLook from "./TodaysLook";
import HomeLogo from "../../assets/images/HomeLogo.svg";
import LiveThumbnail from "../../components/LiveThumbnail";
import { useEffect, useState } from "react";
import axios from "axios";
import introduce1 from "@/assets/images/main_introduce1.svg";
import introduce2 from "@/assets/images/main_introduce2.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import sendCookie from "../../cookie";
import './index.css';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

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
					const response = await gawmapiAxios.get('/live-room/follow/');
					setLiveRooms(response.data.content);
				} catch (error) {
					setLiveRooms(null);
				}
			};
			fetchLiveRooms();
			sendCookie();
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

			<div className="flex flex-col gap-4 mt-12 mb-24">
				{/* 라이브 목록 */}
				<div className="my-2">
					<Swiper autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}} pagination={{
						clickable: true,
					}} modules={[Autoplay, Pagination]} className="mySwiper">
						<SwiperSlide><img src={introduce1} alt="소개이미지1" className="w-screen object-contain" /></SwiperSlide>
						<SwiperSlide><img src={introduce2} alt="소개이미지2" className="w-screen object-contain" /></SwiperSlide>
					</Swiper>
				</div>
				<div className="flex gap-4 items-center scroll-pl-4 px-2.5 pr-4 snap-x overflow-x-auto">
					{
						liveRooms ? (
							liveRooms.map(room => (
								<LiveComponent
									key={room.liveId}
									image={room.profileImg}
									title={room.name}
									createdDate={new Date(room.createdAt)}
									points={room.point}
								/>
							))
						) : ""
					}
				</div>


				<div className="px-2.5">
					<TodaysLook />
				</div>
			</div>
		</>
	);
}

export default Home;
