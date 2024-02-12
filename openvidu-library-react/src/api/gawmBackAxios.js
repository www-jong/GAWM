import axios from 'axios';
import cookies from 'js-cookie';
const backURL = process.env.NODE_ENV === 'development'
  ? 'http://i10e203.p.ssafy.io/gawm/back/api/sessions'
  : import.meta.env.VITE_BACK_PROD_URL;

const instance = axios.create({
    baseURL:backURL,
    params : {
        language : "ko-KR",
    },
  	headers: {
    access_token: cookies.get('SESSION'),
  }
});

export default instance;
