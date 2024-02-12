import { Link } from "react-router-dom";
import Gawm from "../../assets/Gawm.svg";
import { useUserStore } from "../../stores/user";

/**
 * 마이페이지 내 프로필 배지를 생성합니다
 * 
 * @returns 생성된 JSX component
 */
export default function ProfileBadge() {
	const {
		nickname,
		point,
		level,
		following,
		follower
	} = useUserStore(
		(state) => (
			{
				"nickname": state.nickname,
				"point": state.point,
				"level": state.level,
				"following": state.following_num,
				"follower": state.follower_num
			}
		)
	);

	const levelRequirements = [
		0,
		100,
		150,
		200,
		point
	];
	const levelColors = [
		"#ffffff",
		"#56f244",
		"#f2cc9c",
		"#f29c7e",
		"#f26444"
	];

	return (
		<div className="flex flex-row items-center gap-4 md:gap-6 lg:gap-8 p-4 md:py-6 lg:p-6 bg-[#efefef] rounded-lg">
			{/* 프로필 사진 */}
			<img
				className="flex-auto w-24 md:w-28 lg:w-32 min-w-20 md:min-w-28 lg:min-w-32 max-w-28 md:max-w-32 lg:max-w-36 aspect-square object-cover rounded-full bg-[#d9d9d9]"
				src={``}
			/>
			{/* 프로필 정보 */}
			<div className="grow flex flex-col gap-1">
				{/* 이름 및 포인트 */}
				<div className="flex flex-col gap-1 lg:gap-2">
					{/* 사용자 이름 */}
					<span className="font-bold text-xl md:text-3xl break-all">
						{
							nickname ? (
								<span>{nickname}</span>
							) : (
								<div className="h-3 w-48 bg-white rounded-lg animate-pulse"></div>
							)
						}
					</span>
					{/* 감 포인트 */}
					<span className="flex flex-row gap-1.5 items-center text-sm md:text-base">
						{
							point ? (
								<>
									<img className="w-5" src={Gawm} />
									<span>{point} 감 포인트</span>
								</>
							) : (
								<div className="h-3 w-32 bg-white rounded-lg animate-pulse"></div>
							)
						}
					</span>
				</div>
				{/* 팔로잉 / 팔로워 정보 */}
				<div className="flex flex-row gap-4 text-base">
					{
						(following && follower) ? (
							<>
								<Link to="/mypage/following">{following} 팔로잉</Link>
								<Link to="/mypage/followers">{follower} 팔로워</Link>
							</>
						) : (
							<div className="h-3 w-40 bg-white rounded-lg animate-pulse"></div>
						)
					}
				</div>
				{/* 레벨 정보 */}
				<div className="flex flex-col gap-1 text-sm md:text-base">
					{
						level ? (
							<>
								<span>레벨 {level}</span>
								<div className="self-stretch h-2 flex flex-row justify-start content-stretch rounded-full bg-white">
									<div
										style={
											{
												"--progress": `${point / levelRequirements[level] * 100}%`,
												"--progress-color": `${levelColors[level]}`
											}
										}
										className="flex-none basis-[var(--progress)] rounded-full bg-[var(--progress-color)]"
									>
										<span className="sr-only">{point / levelRequirements[level] * 100}%</span>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="h-3 w-16 bg-white rounded-lg animate-pulse"></div>
								<div className="h-3 w-full bg-white rounded-lg animate-pulse"></div>
							</>
						)
					}
				</div>
			</div>
		</div>
	);
}
