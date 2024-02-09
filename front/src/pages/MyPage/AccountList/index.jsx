import { useLocation } from "react-router-dom";
import AdaptiveContainer from "../../../components/AdaptiveContainer";
import CenteredTopBar from "../CenteredTopBar";
import ListItem from "../../../components/ListGroup/ListItem";
import ListGroup from "../../../components/ListGroup";

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

	// 테스트 데이터
	const content = {
		"status": 200,
		"content": [
			{
				"userId": 2,
				"profile_img": null,
				"nickname": "손쉬운 코코",
				"level": 1,
				"lookbook_num": 0,
				"following_num": 1,
				"follower_num": 1,
				"following": true
			},
			{
				"userId": 1,
				"profile_img": null,
				"nickname": "쉬운 민트",
				"level": 1,
				"lookbook_num": 0,
				"following_num": 2,
				"follower_num": 0,
				"following": true
			}
		],
		"page": 0,
		"totalPage": 1,
		"size": 10,
		"sorted": true,
		"asc": false,
		"filtered": false,
		"last": true,
		"first": true
	}.content;

	return (
		<>
			<CenteredTopBar backtrackTo="/mypage">
				{title}
			</CenteredTopBar>
			
			<AdaptiveContainer className="mt-12 mb-24">
				<ListItem div className="pt-0 pb-2 font-semibold">{content.length} {title}</ListItem>

				<ListGroup div>
					{
						// TODO: 프로필 링크 생성
						content.map(
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
