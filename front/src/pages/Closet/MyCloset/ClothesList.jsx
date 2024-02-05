import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";

export default function ClothesList({ className, clothes, categorySetter }) {
	return (
		<ListGroup className={className ? className : ""}>
			{
				clothes ? (
					<>
						<ListItem
							className="flex flex-row gap-2 items-center"
							onClick={() => { categorySetter(undefined) }}
						>
							<ArrowUturnLeftIcon className="size-4" />
							뒤로가기
						</ListItem>
						{
							clothes.map(
								(clothing) => (
									<ListItem
										key={clothing.clothes_id}
									>
										{clothing.name}
									</ListItem>
								)
							)
						}
					</>
				) : ""
			}
		</ListGroup>
	);
}
