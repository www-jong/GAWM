import { create } from "zustand";
import { edit, editNickname, getFollowingList, userInfo } from "../apis/user";

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
 * @param {string} gender 변경된 성별
 * @param {number} age 변경된 나이
 */
export async function updateUserInfo(gender, age) {
	const formData = new FormData();

	formData.append("gender", gender);
	formData.append("age", age);

	await edit(formData);
	await fetchUserInfo();
}

/**
 * 사용자의 닉네임을 수정합니다
 * 
 * @param {string} nickname 변경된 닉네임
 */
export async function updateNickname(nickname) {
	const formData = new FormData();
	formData.append("nickname", nickname);

	await editNickname(formData);
	await fetchUserInfo();
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