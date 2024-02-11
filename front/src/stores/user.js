import { create } from "zustand";
import { edit, userInfo } from "../apis/user";

/**
 * 로그인한 유저에 대한 store입니다
 */
export const useUserStore = create(
	(set) => (
		{
			// 사용자 정보
			"nickname": null,
			"gender": null,
			"age": null,
			"point": null,
			"level": null,
			"following_num": null,
			"follower_num": null,
			"provider": null
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
		() => (
			{
				"nickname": data.nickname,
				"gender": data.gender,
				"age": data.age,
				"point": data.point,
				"level": data.level,
				"following_num": data.following_num,
				"follower_num": data.follower_num,
				"provider": data.provider
			}
		)
	);
}

/**
 * 사용자 정보를 수정하기 위해 내부에서 호출되는 함수입니다
 * 
 * @param {Object} data 수정할 데이터
 */
async function updateUserInfo(data) {
	// 현재 값 불러오기
	const {
		nickname, gender, age
	} = useUserStore(
		(state) => (
			{
				"nickname": state.nickname,
				"gender": state.gender,
				"age": state.age
			}
		)
	);

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