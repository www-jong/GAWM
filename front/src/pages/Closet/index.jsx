import TopBar from "../../components/TopBar";
import WeeklyWeather from "./WeeklyWeather";
import History from "./History/index.jsx";

/**
 * 옷장 페이지의 component입니다
 * 
 * @returns 옷장 페이지 JSX element
 */
export default function Closet() {
	return (
		<>
			<div className="fixed top-0 left-0 right-0 mx-2.5 my-1.5">
				<TopBar title={<h1 className="font-bold text-2xl">내 옷장</h1>} />
			</div>

			<div className="flex flex-col gap-4 mt-12 px-2.5">
				<WeeklyWeather />
				{/* <div className="flex flex-row gap-2">
					<button className="basis-24 p-2 bg-[#d9d9d9] rounded-lg">옷 추가</button>
					<button className="basis-24 p-2 bg-[#d9d9d9] rounded-lg">감각 추가</button>
				</div> */}

				<div className="grid grid-cols-2">
					<button className={`flex flex-col group`}>
						<div className="text-center w-full py-1 text-tertiary group-[.active]:text-primary font-bold text-lg">옷장</div>
						<div className="h-1 w-full bg-tertiary group-[.active]:bg-primary"></div>
					</button>
					<button className={`flex flex-col group`}>
						<div className="text-center w-full py-1 text-tertiary group-[.active]:text-primary font-bold text-lg">뭐입었더라?</div>
						<div className="h-1 w-full  bg-tertiary group-[.active]:bg-primary"></div>
					</button>
				</div>

				{/* 뭐입었더라 페이지 테스트용 */}
				<History />

			</div>
		</>
	);
}
