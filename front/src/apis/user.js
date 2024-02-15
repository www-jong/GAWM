import { gawmApiAxios } from "../utilities/http-commons";

/**
 * Promise를 생성하는 데 사용되는 axios 객체입니다
 */
const axios = gawmApiAxios();

/**
 * API 서버 요청 시 사용되는 prefix입니다
 */
const prefix = "user";

/**
 * 로그아웃을 요청하는 객체를 생성합니다
 * 
 * @returns Promise 객체
 */
export function logout() {
	return axios.post(`${prefix}/logout`);
}

/**
 * 로그인한 사용자의 정보를 받아오는 객체를 생성합니다
 * 
 * @returns Promise 객체
 */
export function userInfo() {
	return axios.get(`${prefix}/userInfo`);
}

/**
 * 로그인한 사용자의 정보를 수정합니다
 * 
 * @param {FormData} data 요청 데이터를 포함한 FormData
 * @returns Promise 객체
 */
export function edit(data) {
	return axios.patch(
		`${prefix}/userInfo`,
		data
	);
}

/**
 * 로그인한 사용자의 닉네임을 변경합니다
 * 
 * @param {FormData} data 요청 데이터를 포함한 FormData
 * @returns Promise 객체
 */
export function editNickname(data) {
	return axios.patch(
		`${prefix}/userNickname`,
		data
	);
}

/**
 * 프로필 사진을 수정 요청하는 객체를 생성합니다
 * 
 * @param {FormData} data 사진을 포함한 FormData 객체
 * @returns Promise 객체
 */
export function updateProfileImge(data) {
	return axios.patch(
		`${prefix}/profile-img`,
		data
	);
}

/**
 * 로그인한 사용자의 팔로워 목록을 받아오는 객체를 생성합니다
 * 
 * @param {Object} param0 요청 옵션 (page, size, sortBy, sortDirection)
 * @returns Promise 객체
 */
export function getFollowerList(
	{
		page = 0,
		size = 10,
		sortBy = "create_at",
		sortDirection = "asc"
	}
) {
	return axios.get(
		`${prefix}/follower`,
		{
			"params": {
				page, size, sortBy, sortDirection
			}
		}
	);
}

/**
 * 로그인한 사용자의 팔로잉 목록을 받아오는 객체를 생성합니다
 * 
 * @param {Object} options 요청 옵션 (page, size, sortBy, sortDirection)
 * @returns Promise 객체
 */
export function getFollowingList({ page = 0, size = 10, sortBy = 'create_at', sortDirection = 'asc' } = {}) {
	return axios.get(`${prefix}/following`, {
	  params: {
		page,
		size,
		sortBy,
		sortDirection
	  },
	});
  }


/**
 * 사용자를 팔로우하거나 언팔로우합니다.
 * 
 * @param {Object} data 요청 데이터 { fromId: Long, toId: Long }
 * @returns Promise 객체
 */
export function toggleFollow(data) {
    return axios.post(`${prefix}/follow`, data);
}

/**
 * Google로 로그인한 계정의 삭제를 요청합니다
 * 
 * @returns Promise 객체
 */
export function revokeGoogleAccount() {
	return axios.delete(`${prefix}/google`);
}

/**
 * Kakao로 로그인한 계정의 삭제를 요청합니다
 * 
 * @returns Promise 객체
 */
export function revokeKakaoAccount() {
	return axios.delete(`${prefix}/kakao`);
}
