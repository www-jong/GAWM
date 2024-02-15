import { gawmApiAxios } from "../utilities/http-commons";

const axios = gawmApiAxios();
const prefix = "live-room";
const openvdiu_prefix = "api/sessions";

const initSessionData = {
    liveName : String,
    deleted : Boolean,
    isPublic: Boolean,
    customSessionId: String,
}

/**
 * 팔로우하는 사람들의 라이브방 전체 조회
 * 
 * @param {Object} options 조회 옵션 (page, size, sort)
 * @returns {Promise} 팔로우하는 사람들의 라이브방 전체 조회 리스트
 */
export const fetchFollowLiveRooms = ({ page = 0, size = 10, sort = 'createdAt,desc' }) => {
    return axios.get(`${prefix}/follow`, {
        params: { page, size, sort }
    });
};

/**
 *  라이브방 전체 조회
 * 
 * @param {Object} options 조회 옵션
 * @returns {Promise} 라이브방 전체 조회 리스트
 */
export const fetchLiveRooms = ({ page = 0, size = 10, sort = 'createdAt,desc' }) => {
    return axios.get(`${prefix}/list`, {
        params: { page, size, sort }
    });
};

/**
 *  라이브방 옷장 조회
 * 
 */
export const fetchLiveCloset = (liveId) => {
    return axios.get(`${prefix}/closet/${liveId}`, {
    });
};

/**
 * 라이브방 생성을 위한 세션 초기화
 * 
 * @param {initSessionData} data 라이브방 데이터
 * @returns {Promise} 라이브방 세션을 반환
 */
export const initSession = (data) => {
    return axios.post(`${openvidu_prefix}`, data , {
        headers: { 'Content-Type': 'application/json' }
    });
};

/**
 * 라이브방 생성
 * 
 * @returns {Promise,String} 라이브방 생성 토큰
 */
export const fetchConnection = (sessionId) => {
    return axios.post(`${openvidu_prefix}/${sessionId}/connections`, {} , {
        headers: { 'Content-Type': 'application/json' }
    });
};



