import LookThumbnail from "../../components/LookThumbnail";
import TopBar from "../../components/TopBar";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import ThumbnailUser from "../../components/LookThumbnail/User";
import ThumbnailBadge from "../../components/LookThumbnail/Badge";
import Action from "../../components/LookThumbnail/Action";

/**
 * 홈페이지 내 오늘의 감각 component를 생성합니다
 * 
 * @returns 생성된 JSX component
 */
function TodaysLook() {
	// 테스트 데이터
	const looks = {
		"status": 200,
		"content": [
			{
				"lookbook_id": 13,
				"user_id": 1,
				"create_at": "2024-01-27 01:30:00",
				"likes": 23,
				"lookbook_img": "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5349563372/B.jpg",
				"profile_img": "https://isplus.com/data/isp/image/2023/11/21/isp20231121000355.800x.8.jpg"
			},
			{
				"lookbook_id": 2,
				"user_id": 1,
				"create_at": "2024-01-27 01:30:00",
				"likes": 21,
				"lookbook_img": "https://ai.esmplus.com/hellom27/JSL/img/JSL_28035_D02.jpg",
				"profile_img": "https://isplus.com/data/isp/image/2023/11/21/isp20231121000355.800x.8.jpg"
			},
			{
				"lookbook_id": 5,
				"user_id": 3,
				"create_at": "2024-01-27 01:30:00",
				"likes": 17,
				"lookbook_img": "https://ai.esmplus.com/hellom27/JSL/img/JSL_28035_D02.jpg",
				"profile_img": "https://dimg.donga.com/wps/NEWS/IMAGE/2022/08/11/114920621.2.jpg"
			},
			{
				"lookbook_id": 3,
				"user_id": 4,
				"create_at": "2024-01-27 01:30:00",
				"likes": 15,
				"lookbook_img": "https://maybnous.com/file_data/seulgikim/2019/01/29/270f512e6e293cbdda38ed16a0172273.jpg",
				"profile_img": "https://file.mk.co.kr/meet/neds/2019/12/image_readtop_2019_1037112_15760422304009894.jpg"
			},
			{
				"lookbook_id": 7,
				"user_id": 2,
				"create_at": "2024-01-27 01:30:00",
				"likes": 14,
				"lookbook_img": "https://mblogthumb-phinf.pstatic.net/MjAyMzA3MTZfNjAg/MDAxNjg5NDg2NTkwMTU0.n0H3AzqAbTC9PQxjAIKx15_jJQg_FwRG6FGOvmpr9L8g.boVFsx-a9mui_fd3UWw1-F4gtvv1AUpFoqZ0wQL9jW8g.JPEG.jayuyu/%ED%82%B9%EB%8D%94%EB%9E%9C%EB%93%9C%EC%9C%A4%EC%95%84%EC%98%B74.jpg",
				"profile_img": "https://thumb.mt.co.kr/06/2021/05/2021051710054255064_1.jpg"
			},
			{
				"lookbook_id": 8,
				"user_id": 1,
				"create_at": "2024-01-27 01:30:00",
				"likes": 12,
				"lookbook_img": "",
				"profile_img": "https://isplus.com/data/isp/image/2023/11/21/isp20231121000355.800x.8.jpg"
			}
		],
		"isFirst": true,
		"isLast": true,
		"page": 1,
		"totalPage": 1,
		"size": 3,
		"sorted": false,
		"asc": false,
		"filtered": false
	};

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

			<div className="flex flex-row justify-around">
				{
					looks.content.map(
						(look, index) => (
							index < 2 ? (
								<LookThumbnail
									key={look.lookbook_id}
									lookInfo={look}
									width={40}
									height={64}
									action
								/>
							) : ""
						)
					)
				}
			</div>
		</div>
	);
}

export default TodaysLook;
