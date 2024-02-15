import { Link } from "react-router-dom";
import CenteredTopBar from "../CenteredTopBar";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../stores/user";
import { getBookmarkedLookbooks } from "../../../apis/lookbook";
import ListItem from "../../../components/ListGroup/ListItem";

export default function Bookmark() {
	const [lookbooks, setLookbooks] = useState([]);
	const userId = useUserStore((state) => state.user?.userId);

	useEffect(
		() => {
			const fetcher = async () => {
				const data = await getBookmarkedLookbooks();
				setLookbooks(data.data.data);
			};

			fetcher();
		},
		[userId]
	);

	return (
		<>
			<CenteredTopBar backtrackTo="/mypage">
				<span className="text-xl">북마크한 감각</span>
			</CenteredTopBar>

			{
				lookbooks.length ? (
					<div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
						{
							lookbooks.map(
								(lookbook) => (
									<Link
										key={lookbook.lookbookId}
										to={`/look/${lookbook.lookbookId}`}
										style={{"--image-url": `url(${import.meta.env.VITE_CLOTHES_BASE_URL}/${lookbook.image})`}}
										className="aspect-square bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
									></Link>
								)
							)
						}
					</div>
				) : (
					<ListItem div noHover className="mt-4 flex flex-row justify-center">
						북마크한 감각이 없습니다
					</ListItem>
				)
			}
		</>
	)
}
