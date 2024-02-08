import { Link } from "react-router-dom";
import CenteredTopBar from "../CenteredTopBar";

export default function Bookmark() {
	// 테스트 데이터
	const images = [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Giant_Panda_2004-03-2.jpg/640px-Giant_Panda_2004-03-2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Giant_Panda_at_Chengdu_Panda_Base.jpg/640px-Giant_Panda_at_Chengdu_Panda_Base.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Giant_panda_%281%29.jpg/640px-Giant_panda_%281%29.jpg"
	]

	return (
		<>
			<CenteredTopBar backtrackTo="/mypage">
				<span className="text-xl">북마크한 감각</span>
			</CenteredTopBar>

			<div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
				{
					// TODO: 감각 표시 방법 변경
					images.map(
						(image) => (
							<Link
								key={image}
								to={""}
								style={{"--image-url": `url(${image})`}}
								className="aspect-square bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
							></Link>
						)
					)
				}
			</div>
		</>
	)
}
