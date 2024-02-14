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
 * 옷 이미지 데이터를 서버에 업로드하는 함수
 * 
 * @param {FormData} formData - 옷 이미지 데이터가 포함된 FormData 객체
 * @returns Promise 객체
 */
export const uploadClothesImage = async (formData) => {
    try {
        const response = await gawmApiAxios().post('/clothes', formData, {
            withCredentials: true,
        });
        console.log("업로드 결과:", response);
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("옷 이미지 업로드 중 오류 발생:", error);
        throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

/**
 * 로그인한 유저의 옷을 조회
 * 
 * @returns Promise 객체, 조회된 데이터를 반환합니다.
 */
export const getAllClothesInfo = async () => {
    try {
        // gawmApiAxios 인스턴스를 사용하여 요청을 보냅니다.
        // URL은 전체 경로를 명시해야 합니다.
        const response = await gawmApiAxios().get("/clothes/list");
        console.log("조회 결과:", response);
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("외부 API 조회 중 오류 발생:", error);
        throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있도록 합니다.
    }
};
/**
 * 옷 마스킹처리
 * 
 * @param {FormData} data 옷 데이터가 있는 FormData 객체
 * @returns Promise 객체
 */
export const maskingImage = async (formData) => {
	try {
	  const response = await aiApiAxios().post('/masking/', formData,{
		responseType:'blob',
	  });
      return response;
	} catch (error) {
	  // 오류 처리 로직을 여기에 추가할 수 있습니다.
	  console.error("옷 추가 중 오류 발생:", error);
	  throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있도록 합니다.
	}
  };


  /**
 * AI 태깅 상태를 조회하는 함수
 * 
 * @param {string} productId AI 태깅 상태를 조회할 제품의 ID
 * @returns Promise 객체, AI 태깅 상태 조회 응답을 반환
 */
export const get_tagging_status = async (productId) => {
    try {
        // 'aiApiAxios' 인스턴스를 사용하여 AI 서버의 상태 조회 엔드포인트로 GET 요청
		console.log('조회시도',productId)
        const response = await aiApiAxios().get(`/tag/status/${productId}`);
		console.log("조회결과",response)
        return response; // 응답 객체 반환
    } catch (error) {
        console.error("AI 태깅 상태 조회 중 오류 발생:",productId, error);
        throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

  /**
 * AI 태그 가져오기
 * 
 * @param {string} productId AI 태깅 상태를 조회할 제품의 ID
 * @returns Promise 객체, AI 태깅 상태 조회 응답을 반환
 */
  export const get_tag = async (productId) => {
    try {
        // 'aiApiAxios' 인스턴스를 사용하여 AI 서버의 상태 조회 엔드포인트로 GET 요청
		console.log('조회시도',productId)
        const response = await aiApiAxios().get(`/tag/get/${productId}`);
		console.log("조회결과",response)
        return response; // 응답 객체 반환
    } catch (error) {
        console.error("AI 태깅 상태 조회 중 오류 발생:",productId, error);
        throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있도록 합니다.
    }
};
/**
 * 옷 이미지를 AI 서버에 업로드하여 태깅 정보를 받아오는 함수
 * 
 * @param {FormData} formData 옷 이미지 데이터가 있는 FormData 객체
 * @returns Promise 객체
 */
export const uploadImageForTagging = async (formData) => {
    try {
        // 'aiApiAxios' 인스턴스를 사용하여 AI 서버의 엔드포인트로 POST 요청
        const response = await aiApiAxios().post('/tag/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error("태그 업로드 중 오류 발생:", error);
        throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

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
export const getClothesInfo = async (clothesId) => {
	try{
        // gawmApiAxios 인스턴스를 사용하여 요청을 보냅니다.
        // URL은 전체 경로를 명시해야 합니다.
        const response = await gawmApiAxios().get(`/clothes/${clothesId}`);
        console.log("조회 결과:", response);
		response.data.data.clothesImg=`https://gwwmbucket.s3.ap-northeast-2.amazonaws.com/`+response.data.data.clothesImg
        return response.data; // 응답 데이터 반환
    } catch (error) {
        console.error("외부 API 조회 중 오류 발생:", error);
        throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있도록 합니다.
    }
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
