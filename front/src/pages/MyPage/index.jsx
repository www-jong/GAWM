import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import ProfileBadge from "./ProfileBadge";
import ListGroup from "../../components/ListGroup";
import ListItem from "../../components/ListGroup/ListItem";
import { BookmarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

/**
 * 마이페이지 페이지 영역을 생성합니다
 * 
 * @returns 생성된 JSX component
 */
export default function MyPage() {
	return (
		<>
			<div className="fixed top-0 left-0 right-0 px-2.5 py-1.5 bg-white">
				<TopBar title={<h1 className="font-bold text-2xl">마이페이지</h1>} />
			</div>

			<div className="flex flex-col gap-4 mt-12 mb-24 mx-auto px-2.5 md:px-0 w-full md:w-8/12 lg:w-6/12">
				<ProfileBadge />

				<ListGroup div>
					<ListItem link href="/mypage/settings" className="flex flex-row items-center gap-2">
						<Cog6ToothIcon className="size-6" />
						<span>계정 설정</span>
					</ListItem>
					<ListItem link href="/mypage/bookmark" className="flex flex-row items-center gap-2">
						<BookmarkIcon className="size-6" />
						<span>북마크한 감각</span>
					</ListItem>
				</ListGroup>
			</div>

			<Outlet />
		</>
	);
}
