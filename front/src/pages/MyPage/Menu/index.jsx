import { BookmarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";
import { useUserStore } from "../../../stores/user";
import Settings from "../Settings";

export default function Menu() {
	const {
		nickname,
		gender,
		age
	} = useUserStore(
		(state) => (
			{
				"nickname": state.user?.nickname,
				"gender": state.user?.gender,
				"age": state.user?.age
			}
		)
	);

	return (
		<>
			<ListItem className="mt-4 pb-1 text-[#767676] text-sm" noHover div>
				북마크한 감각
			</ListItem>
			<ListGroup div>
				<ListItem link href="/mypage/bookmark" className="flex flex-row items-center gap-2">
					<BookmarkIcon className="size-6" />
					<span>북마크한 감각</span>
				</ListItem>
			</ListGroup>
			<Settings />
		</>
	)
}
