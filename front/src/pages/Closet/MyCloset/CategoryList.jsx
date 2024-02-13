import CategoryThumbnail from "./CategoryThumbnail";

/**
 * 옷의 카테고리를 나타내는 component를 생성합니다
 * 
 * - closet: 옷의 목록
 * - categorySetter: 카테고리 클릭 시 호출할 함수
 * 
 * @returns 생성된 JSX component
 */
export default function CategoryList({ closet, categorySetter }) {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{
				Array.from(
					closet.keys()
				).map(
					(category) => (
						<CategoryThumbnail
							key={category}
							category={closet.get(category)}
							onClick={() => categorySetter(category)}
						/>
					)
				)
			}
		</div>
	);
}
