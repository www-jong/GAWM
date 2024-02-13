import { useState } from "react";
import ListGroup from "../../../../components/ListGroup";
import Detail from "./Detail";

/**
 * 옷의 세부 정보를 표시하는 component를 생성합니다
 * 
 * - data: 옷의 세부 정보
 * - isEditing: 현재 편집 중인지 확인
 * 
 * @returns 생성된 JSX component
 */
export default function DetailContainer({ data, isEditing = false }) {
	return (
		<ListGroup div>
			<Detail label="이름" name="name" value={data.name} isEditing={isEditing} />
			<Detail label="브랜드" name="brand" value={data.brand} isEditing={isEditing} />
			<Detail label="주 카테고리" name="m_category" value={data.mcategory} isEditing={isEditing} multiple />
			<Detail label="부 카테고리" name="s_category" value={data.scategory} isEditing={isEditing} multiple />
			<Detail label="색상" name="colors" value={data.colors} isEditing={isEditing} multiple />
			<Detail label="소재" name="materials" value={data.materials} isEditing={isEditing} multiple />
			<Detail label="패턴" name="patterns" value={data.patterns} isEditing={isEditing} multiple />
		</ListGroup>
	);
}
