import { BookmarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";

export default function Menu() {
	return (
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
	)
}
