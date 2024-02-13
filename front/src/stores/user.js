import { create } from "zustand";
import { edit, getFollowingList, userInfo } from "../apis/user";

/**
 * 로그인한 유저에 대한 store입니다
 */
export const useUserStore = create(
	(set) => (
		{
			/**
			 * 사용자 정보
			 * 
			 * - userId: 사용자 ID
			 * - profileImg: 프로필 사진
			 * - nickname: 닉네임
			 * - gender: 성별
			 * - age: 나이
			 * - point: 감 포인트
			 * - level: 레벨
			 * - following_num: 팔로잉 수
			 * - follower_num: 팔로워 수
			 * - provider: 로그인 서비스 제공자
			 */
			"user": null
		}
	)
);

/**
 * 사용자 정보를 불러옵니다
 */
export async function fetchUserInfo() {
	const response = await userInfo();
	const data = response.data.data;

	useUserStore.setState(
		() => ({ "user": data })
	);
}

/**
 * 사용자의 정보를 수정합니다
 * 
 * - nickname: 속성 존재 시 닉네임 수정
 * - gender: 속성 존재 시 성별 수정
 * - age: 속성 존재 시 나이 수정
 * 
 * @param {Object} data 수정할 데이터
 */
export async function updateUserInfo(data) {
	// 현재 값 불러오기
	const {
		nickname, gender, age
	} = useUserStore(
		(state) => (
			{
				"nickname": state.user?.nickname,
				"gender": state.user?.gender,
				"age": state.user?.age
			}
		)
	);

	// data에 필요한 속성이 없으면 중지
	if(
		!(
			"nickname" in data ||
			"gender" in data ||
			"age" in data
		)
	) return;

	// 새로운 값 존재 시 업데이트
	const payload = {};
	payload.nickname = "nickname" in data ? data.nickname : nickname;
	payload.gender = "gender" in data ? data.gender : gender;
	payload.age = "age" in data ? data.age : age;

	// 수정 요청
	await edit(payload);
	await fetchUserInfo();
}

/**
 * 사용자의 별명을 업데이트합니다
 * 
 * @param {string} nickname 닉네임
 */
export async function updateNickname(nickname) {
	await updateUserInfo({ nickname });
}

/**
 * 사용자의 성별을 업데이트합니다
 * 
 * @param {string} gender 성별
 */
export async function updateGender(gender) {
	await updateUserInfo({ gender });
}

/**
 * 사용자의 나이를 업데이트합니다
 * 
 * @param {number|string} age 나이
 */
export async function updateAge(age) {
	await updateUserInfo({ age });
}


/**
 * 로그인한 유저의 팔로잉 목록의 닉네임 배열을 불러와 저장합니다
 */
export async function fetchFollowingNicknames() {
	try {
	  const response = await getFollowingList({});
	  const followingNicknames = response.data.content.map(user => user.nickname);
	  useUserStore.setState(state => ({ ...state, followingNicknames }));
	} catch (error) {
	  console.error('팔로잉 목록을 불러오는데 실패했습니다:', error);
	}
  }