// import { gawmApiAxios, aiApiAxios } from "../utilities/http-commons";

// /**
//  * Backend API 서버 요청 Promise를 생성하는 데 사용되는 axios 객체입니다
//  */
// const axios = gawmApiAxios();


// /**
//  * API 서버 요청 시 사용되는 prefix입니다
//  */
// const prefix = "lives";


// /**
//  * 로그인한 유저의 옷을 조회
//  * 
//  * @returns Promise 객체, 조회된 데이터를 반환합니다.
//  */
// export const getAllClothesInfo = async () => {
//     try {
//         // gawmApiAxios 인스턴스를 사용하여 요청을 보냅니다.
//         // URL은 전체 경로를 명시해야 합니다.
//         const response = await gawmApiAxios().get("/clothes/list");
//         console.log("조회 결과:", response);
//         return response.data; // 응답 데이터 반환
//     } catch (error) {
//         console.error("외부 API 조회 중 오류 발생:", error);
//         throw error; // 오류를 다시 던져 호출한 곳에서 처리할 수 있도록 합니다.
//     }
// };