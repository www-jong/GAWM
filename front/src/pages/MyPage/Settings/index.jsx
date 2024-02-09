import AdaptiveContainer from "../../../components/AdaptiveContainer";
import CenteredTopBar from "../CenteredTopBar";
import ListGroup from "../../../components/ListGroup";
import ListItem from "../../../components/ListGroup/ListItem";

/**
 * 마이페이지 내 설정 페이지를 생성합니다
 * 
 * @returns 설정 페이지 component
 */
export default function Settings() {
	return (
		<>
			<CenteredTopBar backtrackTo="/mypage">
				계정 설정
			</CenteredTopBar>

			<AdaptiveContainer className="mt-12 mb-24">
				{/* 계정 설정 */}
				<ListItem className="pt-2 pb-1 text-[#767676] text-sm" noHover div>
					계정 설정
				</ListItem>
				<ListGroup div>
					{/* 닉네임 변경 */}
					<ListItem link href="/mypage/settings/nickname" className="flex flex-row gap-4">
						<span className="grow">닉네임 설정</span>
						<span className="text-[#767676]">{"감없는 판다"}</span>
					</ListItem>
					<ListItem link href="/mypage/settings/gender" className="flex flex-row gap-4">
						<span className="grow">성별 설정</span>
						<span className="text-[#767676]"></span>
					</ListItem>
					<ListItem link href="/mypage/settings/age" className="flex flex-row gap-4">
						<span className="grow">나이 설정</span>
						<span className="text-[#767676]">{5}</span>
					</ListItem>
				</ListGroup>

				{/* 로그아웃 / 회원탈퇴 */}
				<ListItem className="mt-4 pt-2 pb-1 text-[#767676] text-sm" noHover div>
					기타
				</ListItem>
				{/* TODO: 로그아웃, 회원탈퇴 링크 추가 */}
				<ListGroup div>
					<ListItem link>
						로그아웃
					</ListItem>
					<ListItem link>
						회원탈퇴
					</ListItem>
				</ListGroup>
			</AdaptiveContainer>
		</>
	)
}