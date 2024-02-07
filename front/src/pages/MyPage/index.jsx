import { Outlet, useMatch } from "react-router-dom";
import TopBar from "../../components/TopBar";
import ProfileBadge from "./ProfileBadge";
import AdaptiveContainer from "../../components/AdaptiveContainer";

/**
 * 마이페이지 페이지 영역을 생성합니다
 * 
 * @returns 생성된 JSX component
 */
export default function MyPage() {
	const match = useMatch("/mypage/:page");
	const page = match?.props.page;
	const overlayPage = (
		typeof page === "undefined" ||
		page !== "bookmark"
	);

	console.log(page);

	return (
		<>
			<div className="fixed top-0 left-0 right-0 px-2.5 py-1.5 bg-white">
				<TopBar title={<h1 className="font-bold text-2xl">마이페이지</h1>} />
			</div>

			{
				!overlayPage ? (
					<Outlet />
				) : (
					<AdaptiveContainer className="flex flex-col gap-4 mt-12 mb-24">
						<ProfileBadge />
						<Outlet />
					</AdaptiveContainer>
				)
			}
		</>
	);
}
