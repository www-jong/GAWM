/**
 * 옷장 페이지에서 하나의 카테고리를 표시하는 component를 생성합니다
 * 
 * - category: 카테고리 정보
 * - onClick: 클릭 시 실행할 함수
 * 
 * @returns 생성된 JSX 객체
 */
export default function CategoryThumbnail({ category, onClick }) {
	const imageUrl = import.meta.env.VITE_CLOTHES_BASE_URL;

	const thumbnails = Array.from(
		category.values()
	).slice(
		0, 4
	).map(
		(item) => (
			<div
				key={item.clothesId}
				style={{ "--image-url": `url(${imageUrl}/${item.clothesImg})` }}
				className="aspect-square bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat"
			></div>
		)
	);
	const containerClass = `grid ${thumbnails.length > 1 ? "grid-cols-2 grid-rows-2" : "grid-cols-1 grid-rows 1"} rounded-lg overflow-hidden`;

	return (
		<div className="flex flex-col gap-2 cursor-pointer" onClick={onClick}>
			<div className={`bg-[#efefef] ${containerClass}`}>
				{thumbnails}
			</div>
			<div className="flex flex-col">
				<span>{category[0].mcategory}</span>
				<small className="text-[#767676]">{category.length}</small>
			</div>
		</div>
	);
}
