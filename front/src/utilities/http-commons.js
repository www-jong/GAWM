import axios from "axios";
import cookies from "js-cookie";

const GAWM_API_URL = import.meta.env.MODE === "production" ? import.meta.env.VITE_GAWM_API_URL : "https://i10e203.p.ssafy.io/gawm/back";
const AI_API_URL = import.meta.env.MODE === "production" ? import.meta.env.VITE_GAWM_AI_API_URL : "https://i10e203.p.ssafy.io/gawm/ai";

/**
 * GAWM API 서버에 연결하는 axios 객체를 생성합니다
 * 
 * @returns GAWM API axios 객체
 */
export function gawmApiAxios() {
	return axios.create(
		{
			"baseURL": GAWM_API_URL,
			"params": {
				"language": "ko-KR"
			},
			"withCredentials": true
		}
	);
}

/**
 * GAWM AI API 서버에 연결하는 axios 객체를 생성합니다
 * 
 * @returns GAWM AI API axios 객체
 */
export function aiApiAxios() {
	return axios.create(
		{
			"baseURL": AI_API_URL
		}
	);
}
