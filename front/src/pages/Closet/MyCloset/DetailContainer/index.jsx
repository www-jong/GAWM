import { useState } from "react";
import ListGroup from "../../../../components/ListGroup";
import Detail from "./Detail";

/**
 * 옷의 세부 정보를 표시하는 component를 생성합니다
 * 
 * - data: 옷의 세부 정보
 * 
 * @returns 생성된 JSX component
 */
export default function DetailContainer({ data }) {
	return (
		<ListGroup div>
			<Detail label="브랜드" value={data.brand} />
			<Detail label="이름" value={data.name} />
			<Detail label="카테고리" value={`${data.mCategory} > ${data.sCategory}`} />
			<Detail label="색상" value={data.colors} />
			<Detail label="소재" value={data.materials} />
			<Detail label="패턴" value={data.patterns} />
		</ListGroup>
	);
}
