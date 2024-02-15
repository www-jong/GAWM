// 쿠키 가져오기
  function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for(let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split('=');
      if(name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }
  
export default function sendCookie(){
  // 현재 URL이 /gawm인지 확인
  if (window.location.pathname === '/gawm') {
    // 쿠키 가져와서 mycookie에 저장
    const mycookie = getCookie('userSessionId');
    document.cookie = mycookie;
    if (mycookie) {
      // 만약 mycookie가 존재하면 다른 경로로 리다이렉트하면서 쿠키 함께 전송
      window.location.href = "http://localhost:4000";
     
    } else {
      // 쿠키가 존재하지 않을 경우 다른 경로로 리다이렉트하지 않고 그대로 유지
      console.log("쿠키가 존재하지 않습니다.");
    }
  }
}

  