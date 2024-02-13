import { gawmApiAxios, aiApiAxios } from "../utilities/http-commons";

/**
 * Backend API 서버 요청 Promise를 생성하는 데 사용되는 axios 객체입니다
 */
const axios = gawmApiAxios();

/**
 * AI 서버 요청 Promise를 생성하는 데 사용되는 axios 객체입니다
 */
const aiAxios = aiApiAxios();

/**
 * API 서버 요청 시 사용되는 prefix입니다
 */
const prefix = "clothes";

/**
 * 로그인한 사용자의 옷을 조회하는 객체를 생성합니다
 * 
 * @returns Promise 객체
 */
export function getAllClothesInfo() {
	return axios.get(`${prefix}/list`);
}

/**
 * 이미지 마스킹 처리를 요청하는 객체를 생성합니다
 * 
 * @param {FormData} data image가 있는 FormData 객체
 * @returns Promise 객체
 */
export function maskingImage(data) {
	return aiAxios.post(
		"masking",
		data
	);
}

/**
 * 로그인한 사용자의 옷을 추가 요청하는 객체를 생성합니다
 * 
 * @param {FormData} data 옷 데이터가 있는 FormData 객체
 * @returns Promise 객체
 */
export function createClothes(data) {
	return axios.post(
		`${prefix}`,
		data
	);
}

/**
 * 로그인한 사용자의 옷을 수정 요청하는 객체를 생성합니다
 * 
 * @param {number|string} clothesId 수정할 옷 ID
 * @param {FormData} data 수정할 옷 데이터가 있는 FormData 객체
 * @returns Promise 객체
 */
export function updateClothes(clothesId, data) {
	return axios.patch(
		`${prefix}/${clothesId}`,
		data
	);
}

/**
 * 로그인한 사용자의 옷을 삭제 요청하는 객체를 생성합니다
 * 
 * @param {number|string} clothesId 삭제할 옷 ID
 * @returns Promise 객체
 */
export function deleteClothes(clothesId) {
	return axios.delete(`${prefix}/${clothesId}`);
}

/**
 * 로그인한 사용자의 특정 옷을 조회하는 객체를 생성합니다
 * 
 * @param {number|string} clothesId 조회할 옷 ID
 * @returns Promise 객체
 */
export function getClothesInfo(clothesId) {
	return axios.get(`${prefix}/${clothesId}`);
}

/**
 * 로그인한 사용자의 옷을 특정한 조건으로 검색하는 객체를 생성합니다
 * 
 * - clothesname: 옷 이름
 * - mcategory: 상위 카테고리
 * - nickname: 닉네임
 * - brand: 브랜드
 * 
 * @param {Object} data 요청 데이터
 * @returns Promise 객체
 */
export function getClothesInfoBy(data) {
	const parameters = new URLSearchParams();

	if("clothesname" in data) parameters.append("clothesname", data.clothesname);
	if("mcategory" in data) parameters.append("mcategory", data.mcategory);
	if("nickname" in data) parameters.append("nickname", data.nickname);
	if("brand" in data) parameters.append("brand", data.brand);

	return axios.get(
		`${prefix}/search`,
		parameters
	);
}
