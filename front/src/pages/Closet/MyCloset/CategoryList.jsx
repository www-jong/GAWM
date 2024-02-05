import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";

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
