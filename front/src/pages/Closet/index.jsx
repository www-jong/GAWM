import TopBar from "../../components/TopBar";

export default function Closet() {
	return (
		<>
			<div className="fixed top-0 left-0 right-0 mx-2.5 my-1.5">
				<TopBar title={<h1 className="font-bold text-2xl">내 옷장</h1>} />
			</div>

			<div className="flex flex-col gap-4 mt-12 px-2.5">
				<div className="flex flex-row gap-2">
					<button className="basis-24 p-2 bg-[#d9d9d9] rounded-lg">옷 추가</button>
					<button className="basis-24 p-2 bg-[#d9d9d9] rounded-lg">감각 추가</button>
				</div>
			</div>
		</>
	);
}
