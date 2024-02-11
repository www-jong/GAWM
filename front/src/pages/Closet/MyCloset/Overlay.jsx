/**
 * 존재하는 페이지 위에 표시되는 overlay를 생성합니다
 * 
 * - children: 내부에 배치할 요소
 * 
 * @returns 생성된 Overlay 객체
 */
export default function Overlay({ children }) {
	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 w-full min-h-full overflow-y-auto bg-white pb-24">
			{children}
		</div>
	);
}
