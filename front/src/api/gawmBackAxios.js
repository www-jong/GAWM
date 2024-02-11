import axios from 'axios';
import cookies from 'js-cookie';
const backURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080/gawm/back'
  : import.meta.env.VITE_BACK_PROD_URL;

const instance = axios.create({
    baseURL:backURL,
    params : {
        language : "ko-KR",
    },
  	headers: {
    Authorization: cookies.get('SESSION'),
  }
});

export default instance;
