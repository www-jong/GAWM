import { Link } from "react-router-dom";
import Mascot from "../../assets/images/Mascot.svg";
import CoolMascot from "../../assets/images/CoolMascot.svg";
import { useState } from "react";

// image : 유저 프로필사진, post : 가는 주소, user : 컴포넌트, badge : 
/**
 * 하나의 오늘의 감각을 표시하는 component를 생성합니다
 * 
 * - lookInfo: 오늘의 감각 정보
 * - width: LookThumbnail의 너비
 * - height: action 버튼을 포함한 LookThumbnail의 높이
 * - div: 속성 존재 시 <Link> 대신 <div> 생성
 * - action: 속성 존재 시 하단 버튼 생성
 * - isLiked: 해당 감각이 좋아요 처리되었는지 확인
 * - setIsLiked: isLiked를 수정할 시 호출할 함수
 * 
 * @returns 생성된 JSX component
 */
function LookThumbnail({ lookInfo, width, height, isLiked, setIsLiked }) {
	const actionPresent = "action" in arguments[0];

    const appliedStyle = {"--image-url": `url(${lookInfo.lookbook_img})`};
	const appliedClassName=`flex flex-col justify-between rounded-lg ${width ? `w-${width} ` : ""}${height ? `h-${height} ` : ""}`;

	const countFormatter = new Intl.NumberFormat(
		"ko-KR",
		{
			"maximumFractionDigits": 1,
			"notation": "compact"
		}
	);

	// 좋아요 테스트 변수
	// TODO: 실제 데이터 사용
	[isLiked, setIsLiked] = useState(false);

	const element = (
		<>
			<div
				style={appliedStyle}
				className={`flex flex-col grow justify-between rounded-t-lg ${actionPresent ? "" : "rounded-b-lg"} bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat`}
			>
				<div className="flex mx-1.5 my-1 gap-1 self-end p-1 bg-black/50 rounded-lg">
					<img className="flex-none w-4" src={Mascot} />
					<span className="flex-auto text-white text-xs">{countFormatter.format(lookInfo.likes)}</span>
				</div>
				<div className={`flex flex-row px-2.5 py-1.5 self-stretch items-center gap-2 bg-black/50 ${actionPresent ? "" : "rounded-b-lg"}`}>
					<img className="size-5 object-cover rounded-full bg-tertiary" src={lookInfo.profile_img} />
					{/* TODO: 사용자 ID 적용하기 */}
					<span className="font-nps text-white text-xs truncate">{/* lookInfo.user_id */ "boringpanda"}</span>
				</div>
			</div>
			{
				actionPresent ? (
					<button
						className={`group self-stretch p-2 px-auto flex justify-center items-center gap-1 ${isLiked ? "active bg-[#fbc6ba]" : "bg-[#f0eeee]"} rounded-b-lg`}
						onClick={() => setIsLiked(!isLiked)}
					>
						{
							isLiked ? (
								<>
									<img className="flex-none h-4" src={CoolMascot} />
									<span className="flex-none font-pretendard text-xs">감 있어요!</span>
								</>
							) : (
								<>
									<img className="flex-none h-4" src={Mascot} />
									<span className="flex-none font-pretendard text-xs">감 있나요?</span>
								</>
							)
						}
					</button>
				) : ""
			}
		</>
	);

	if("div" in arguments[0]) {
		return (
			<div
				className={appliedClassName}
			>
				{element}
			</div>
		);
	}
	else {
		return (
			<Link
				className={appliedClassName}
			>
				{element}
			</Link>
		);
	}
}

export default LookThumbnail;
