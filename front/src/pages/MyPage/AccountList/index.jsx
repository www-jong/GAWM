import { useLocation } from "react-router-dom";
import AdaptiveContainer from "../../../components/AdaptiveContainer";
import CenteredTopBar from "../CenteredTopBar";
import ListItem from "../../../components/ListGroup/ListItem";
import ListGroup from "../../../components/ListGroup";
import { useEffect, useState } from "react";
import { getFollowerList, getFollowingList } from "../../../apis/user";
import { useUserStore } from "../../../stores/user";

export default function AccountList() {
	const pathname = useLocation().pathname;
	const mode = (
		pathname === "/mypage/following" ? (
			"following"
		) : pathname === "/mypage/followers" ? (
			"followers"
		) : undefined
	);
	const title = (
		mode === "following" ? (
			"팔로잉"
		) : mode === "followers" ? (
			"팔로워"
		) : undefined
	);

	const pageSize = 10;
	const [list, setList] = useState([]);
	const [page, setPage] = useState(0);
	const [isLast, setIsLast] = useState(false);
	const size = useUserStore(
		(state) => (mode === "followers") ? state.user?.follower_num : state.user?.following_num
	);

	const appendList = async () => {
		if(isLast) return;

		const response = (
			(mode === "followers") ?
				await getFollowerList(page, pageSize) :
				await getFollowingList(page, pageSize)
		).data;
		if(response?.content)
			setList([...list, ...response.content]);

		setPage(response.page + 1);
		setIsLast(response.isLast);
	};
	const onScroll = async () => {
		if(window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLast)
			await appendList();
	}

	useEffect(
		() => {
			window.addEventListener("scroll", onScroll);
			appendList();

			return () => {
				window.removeEventListener("scroll", onScroll);
			};
		},
		[]
	);

	return (
		<>
			<CenteredTopBar backtrackTo="/mypage">
				{title}
			</CenteredTopBar>
			
			<AdaptiveContainer className="mt-12 mb-24">
				<ListItem div className="pt-0 pb-2 font-semibold">{size} {title}</ListItem>

				<ListGroup div>
					{
						list.map(
							(profile) => (
								<ListItem key={profile.userId} className="flex flex-row gap-4 items-center" link href={""}>
									<img className="size-14 rounded-full bg-[#767676]" src={profile.profile_img} />
									<span>{profile.nickname}</span>
								</ListItem>
							)
						)
					}
				</ListGroup>
			</AdaptiveContainer>
		</>
	)
}
