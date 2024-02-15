import { gawmApiAxios } from "../utilities/http-commons";

const axios = gawmApiAxios();
const prefix = "look-book";

/**
 * 룩북 전체 조회
 * 
 * @param {Object} options 조회 옵션 (page, size, sort)
 * @returns {Promise} 조회된 룩북 목록을 반환하는 Promise 객체
 */
export const fetchLookbooks = ({ page = 0, size = 10, sort = 'createdAt,desc' }) => {
    return axios.get(`${prefix}/list`, {
        params: { page, size, sort }
    });
};

/**
 * 룩북 단일 조회
 * 
 * @param {number|string} lookbookId 조회할 룩북의 ID
 * @returns {Promise} 조회된 룩북 정보를 반환하는 Promise 객체
 */
export const fetchLookbookById = (lookbookId) => {
    return axios.get(`${prefix}/${lookbookId}`);
};

/**
 * 룩북 등록
 * 
 * @param {FormData} formData 등록할 룩북의 데이터 (멀티파트 폼 데이터)
 * @returns {Promise} 룩북 등록 결과를 반환하는 Promise 객체
 */
export const createLookbook = (formData) => {
    return axios.post(`${prefix}`, formData);
};

/**
 * 룩북 수정
 * 
 * @param {number|string} lookbookId 수정할 룩북의 ID
 * @param {FormData} formData 수정할 룩북의 데이터 (멀티파트 폼 데이터)
 * @returns {Promise} 룩북 수정 결과를 반환하는 Promise 객체
 */
export const updateLookbook = (lookbookId, formData) => {
    return axios.put(`${prefix}/${lookbookId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

/**
 * 룩북 삭제
 * 
 * @param {number|string} lookbookId 삭제할 룩북의 ID
 * @returns {Promise} 룩북 삭제 결과를 반환하는 Promise 객체
 */
export const deleteLookbook = (lookbookId) => {
    return axios.delete(`${prefix}/${lookbookId}`);
};


/**
 * 친구 룩북 전체 조회를 위한 API 호출
 * 
 * @param {Object} params - 요청 파라미터 객체, 페이지 번호(page), 페이지 크기(size), 정렬 기준(sort) 포함
 * @param {number} params.page - 페이지 번호, 기본값 0
 * @param {number} params.size - 페이지 당 항목 수, 기본값 10
 * @param {string} params.sort - 정렬 기준, 기본값 'createdAt,desc'
 * @returns {Promise} Axios Response 객체를 반환하는 Promise
 */
export const fetchFriendLookbooks = ({ page = 0, size = 10, sort = 'createdAt,desc' }) => {
    return axios.get(`${prefix}/following/list`, {
        params: { page, size, sort },
    });
};


/**
 * 룩북 검색을 위한 API 호출
 * 
 * @param {string} keyword - 검색 키워드
 * @returns {Promise} Axios Response 객체를 반환하는 Promise, 검색된 룩북 데이터 포함
 */
export const searchLookbooks = (keyword) => {
    return axios.get(`${prefix}`, {
        params: { search: keyword },
    });
};


/**
 * 룩북 북마크
 *
 * @param {number|string} lookbookId 북마크할 룩북의 ID
 * @returns {Promise} 북마크 결과를 반환하는 Promise 객체
 */
export const bookmarkLookbook = (lookbookId) => {
    return axios.post(`${prefix}/${lookbookId}/bookmark`);
};

/**
 * 룩북 북마크 취소
 *
 * @param {number|string} lookbookId 북마크를 취소할 룩북의 ID
 * @returns {Promise} 북마크 취소 결과를 반환하는 Promise 객체
 */
export const unbookmarkLookbook = (lookbookId) => {
    return axios.post(`${prefix}/${lookbookId}/unbookmark`);
};

/**
 * 북마크한 룩북 조회
 * 
 * @returns Promise 객체
 */
export const getBookmarkedLookbooks = () => (
    axios.get(`${prefix}/bookmarked_list`)
);

/**
 * 룩북에 '감있어요' 등록
 *
 * @param {number|string} lookbookId '감있어요'를 할 룩북의 ID
 * @returns {Promise} '감있어요' 등록 결과를 반환하는 Promise 객체
 */
export const likeLookbook = (lookbookId) => {
    return axios.post(`${prefix}/${lookbookId}/likes`);
};

/**
 * 룩북의 '감있어요' 취소
 *
 * @param {number|string} lookbookId '감있어요'를 취소할 룩북의 ID
 * @returns {Promise} '감있어요' 취소 결과를 반환하는 Promise 객체
 */
export const unlikeLookbook = (lookbookId) => {
    return axios.post(`${prefix}/${lookbookId}/unlikes`);
};

/**
 * 룩북 댓글 등록
 *
 * @param {number|string} lookbookId 댓글을 등록할 룩북의 ID
 * @param {string} content 댓글 내용
 * @returns {Promise} 댓글 등록 결과를 반환하는 Promise 객체
 */
export const addCommentToLookbook = (lookbookId, content) => {
    return axios.post(`${prefix}/${lookbookId}/comment`, { content });
};

/**
 * 룩북 댓글 수정
 *
 * @param {number|string} lookbookId 댓글이 속한 룩북의 ID
 * @param {number|string} commentId 수정할 댓글의 ID
 * @param {string} content 수정할 댓글 내용
 * @returns {Promise} 댓글 수정 결과를 반환하는 Promise 객체
 */
export const updateCommentInLookbook = (lookbookId, commentId, content) => {
    return axios.patch(`${prefix}/${lookbookId}/${commentId}`, { content });
};

/**
 * 룩북 댓글 삭제
 *
 * @param {number|string} lookbookId 댓글이 속한 룩북의 ID
 * @param {number|string} commentId 삭제할 댓글의 ID
 * @returns {Promise} 댓글 삭제 결과를 반환하는 Promise 객체
 */
export const deleteCommentFromLookbook = (lookbookId, commentId) => {
    return axios.delete(`${prefix}/${lookbookId}/${commentId}`);
};


/**
 * 오늘의감각
 *

 * @returns {Promise} 댓글 삭제 결과를 반환하는 Promise 객체
 */
export const get_top_list = () => {
    return axios.get(`${prefix}/top_list`);
};
