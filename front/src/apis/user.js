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
	return axios.post("logout");
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
 * @param {Object} data 요청 데이터
 * @returns Promise 객체
 */
export function edit(data) {
	return axios.patch(
		`${prefix}/userInfo`,
		data
	);
}
