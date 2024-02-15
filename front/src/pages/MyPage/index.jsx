import { Outlet, useLocation } from "react-router-dom";
import TopBar from "../../components/TopBar";
import ProfileBadge from "./ProfileBadge";
import AdaptiveContainer from "../../components/AdaptiveContainer";
import { useEffect } from "react";
import { fetchUserInfo } from "../../stores/user";

/**
 * 마이페이지 페이지 영역을 생성합니다
 * 
 * @returns 생성된 JSX component
 */
export default function MyPage() {
	// 마이페이지 메인 또는 북마크 페이지인지 확인
	const pathname = useLocation().pathname;
	const overlayPage = (
		!pathname.endsWith("/mypage") &&
		!pathname.startsWith("/mypage/bookmark")
	);

	useEffect(
		() => {
			const load = async () => {
				try { await fetchUserInfo(); }
				catch(error) {}
			};

			load();
		}
	);

	return overlayPage ? (
		<Outlet />
	) : (
		<>
			<div className="fixed top-0 left-0 right-0 px-2.5 py-1.5 bg-white">
				<TopBar title={<h1 className="font-bold text-2xl">마이페이지</h1>} />
			</div>
			<AdaptiveContainer className="flex flex-col mt-12 mb-24">
				<ProfileBadge />
				<Outlet />
			</AdaptiveContainer>
		</>
	);
}
