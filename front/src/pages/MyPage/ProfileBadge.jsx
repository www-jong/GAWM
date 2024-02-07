import { Link } from "react-router-dom";
import Gawm from "../../assets/Gawm.svg";

/**
 * 마이페이지 내 프로필 배지를 생성합니다
 * 
 * @returns 생성된 JSX component
 */
export default function ProfileBadge() {
	return (
		<div className="flex flex-row items-center gap-4 md:gap-6 lg:gap-8 p-4 md:py-6 lg:p-6 bg-[#efefef] rounded-lg">
			{/* 프로필 사진 */}
			<img
				className="flex-auto w-24 md:w-28 lg:w-32 min-w-20 md:min-w-28 lg:min-w-32 max-w-28 md:max-w-32 lg:max-w-36 aspect-square object-cover rounded-full bg-[#d9d9d9]"
				src={``}
				alt={`${""}의 프로필 사진`}
			/>
			{/* 프로필 정보 */}
			<div className="grow flex flex-col gap-3">
				{/* 이름 및 포인트 */}
				<div className="flex flex-col gap-1 lg:gap-2">
					{/* 사용자 이름 */}
					<span className="font-bold text-lg md:text-3xl break-all">{"감없는 판다"}</span>
					{/* 감 포인트 */}
					<span className="flex flex-row gap-2 items-center text-base">
						<img className="w-6" src={Gawm} />
						<span>{15} 감 포인트</span>
					</span>
				</div>
				{/* 팔로잉 / 팔로워 정보 */}
				<div className="flex flex-row gap-4 text-base">
					<Link to="/mypage/following">{4} 팔로잉</Link>
					<Link to="/mypage/followers">{2} 팔로워</Link>
				</div>
				{/* 레벨 정보 */}
				<div className="flex flex-col gap-1 text-base">
					<span>레벨 {1}</span>
					<div className="self-stretch h-2 flex flex-row justify-start content-stretch rounded-full bg-white">
						{/* TODO: Progress bar 문제 해결 */}
						<div className={`flex-none basis-[${46}%] rounded-full bg-[${"#f26444"}]`}>
							<span className="sr-only">{`${46}%`}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
