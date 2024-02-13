import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

/**
 * 마이페이지 내부에서 사용되는 상단바입니다
 * 
 * - backtrackTo: 상단바 내부 뒤로가기 링크의 목적지 (속성 존재 시 뒤로가기 <Link>화)
 * - onBacktrack: 상단바 내부 뒤로가기 버튼 클릭 시 호출할 함수
 * - children: 페이지 제목
 * 
 * @returns 상단바 component
 */
export default function CenteredTopBar({ backtrackTo, onBacktrack, children }) {
	const backClassName = "absolute left-2.5 inset-y-0 flex flex-row items-center";
	const arrow = <>
		<ArrowLeftIcon className="size-6" />
		<span className="sr-only">뒤로가기</span>
	</>;

	return (
		<div className="relative px-2.5 py-2.5 bg-white fixed top-0 left-0 right-0">
			{
				backtrackTo ? (
					<Link className={backClassName} to={backtrackTo} onClick={onBacktrack}>
						{arrow}
					</Link>
				) : (
					<button className={backClassName} onClick={onBacktrack}>
						{arrow}
					</button>
				)
			}
			<h2 className="font-bold font-nps text-2xl text-center">
				{children}
			</h2>
		</div>
	);
}
