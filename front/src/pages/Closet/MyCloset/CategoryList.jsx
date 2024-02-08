import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";

/**
 * ListGroup을 확장하여 옷의 카테고리를 포함하는 component를 생성합니다
 * 
 * - className: 생성될 ListGroup의 className 속성
 * - categories: 아이템으로 표시할 카테고리 배열
 * - categorySetter: 카테고리 클릭 시 호출할 함수
 * 
 * @returns 생성된 JSX component
 */
export default function CategoryList({ className, categories, categorySetter }) {
	return (
		<ListGroup className={className ? className : ""}>
			{
				categories.map(
					(category) => (
						<ListItem
							key={category}
							onClick={() => {categorySetter(category)}}
						>
							{category}
						</ListItem>
					)
				)
			}
		</ListGroup>
	);
}
