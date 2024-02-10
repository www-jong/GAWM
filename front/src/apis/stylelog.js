// stylelog.js

import { gawmApiAxios } from "../utilities/http-commons";

/**
 * Backend API 서버 요청 Promise를 생성하는 데 사용되는 axios 객체
 */
const axios = gawmApiAxios();

/**
 * API 서버 요청 시 사용되는 prefix
 */
const prefix = "stylelog";


/**
 * 선택한 년도에 해당하는 스타일로그 데이터 조회
 * 
 * @param {number|string} year 조회할 년도
 * @returns Promise 객체
 */
export function getStyleLogsByYear(year) {
    return axios.get(`${prefix}/list/?year=${year}`);
}

/**
 * 선택한 년도와 월에 해당하는 스타일로그 데이터 조회
 * 
 * @param {number|string} year 조회할 년도
 * @param {number|string} month 조회할 월
 * @returns Promise 객체
 */
export function getStyleLogsByYearAndMonth(year, month) {
    return axios.get(`${prefix}/list/?year=${year}&month=${month}`);
}

/**
 * 특정 스타일로그의 세부 정보 조회
 * 
 * @param {number|string} calendarId 조회할 스타일로그 ID
 * @returns Promise 객체
 */
export function getStyleLogDetails(calendarId) {
    return axios.get(`${prefix}/${calendarId}`);
}


/**
 * 선택한 스타일로그 데이터 삭제
 * 
 * @param {number|string} calendarId 삭제할 스타일로그 ID
 * @returns Promise 객체
 */
export function deleteStyleLog(calendarId) {
    return axios.delete(`${prefix}/${calendarId}`);
}

/**
 * 새로운 스타일로그 데이터 등록
 * 
 * @param {Object} data 등록할 스타일로그 데이터
 * @returns Promise 객체
 */
export function createStyleLog(data) {
    return axios.post(`${prefix}`, data);
}

/**
 * 기존 스타일로그 데이터 수정
 * 
 * @param {number|string} calendarId 수정할 스타일로그 ID
 * @param {Object} data 수정할 스타일로그 데이터
 * @returns Promise 객체
 */
export function updateStyleLog(calendarId, data) {
    return axios.put(`${prefix}/${calendarId}`, data);
}
