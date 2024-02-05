import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";

export default function ClothesDetail({ clothesId }) {
	const data = {
		"status": 200,
		"data": {
			"clothesId": 3,
			"userId": 2,
			"orderNum": 1,
			"clothesImg": "https://blog.kakaocdn.net/dn/bvY0Tz/btq9ynFSVAm/iDqOUXaAXC1PJQtSfbbkU1/img.png",
			"brand": "싸피",
			"name": "싸피후드3",
			"colors": [
				"파랑",
				"초록"
			],
			"materials": [
				"면",
				"폴리에스테르"
			],
			"patterns": [],
			"sCategory": "후드",
			"mCategory": "아우터"
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row justify-between items-center">
				<button className="size-5">
					<ArrowUturnLeftIcon className="size-full" />
				</button>
				<h2 className="text-lg font-bold">{data.data.name}</h2>
				<div className="size-5"></div>
			</div>
			<div className="flex flex-row justify-center self-center w-full md:w-6/12 lg:w-4/12 xl:w-3/12 aspect-square p-2 bg-[#efefef] rounded-lg">
				<img src={data.data.clothesImg} />
			</div>
		</div>
	);
}
