import React, { useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';

const OPENVIDU_SERVER_URL = 'https://localhost:4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

function VideoComponent() {
  useEffect(() => {
    const OV = new OpenVidu();
    let session = OV.initSession();

    session.on('streamCreated', (event) => {
      session.subscribe(event.stream, 'video-container');
    });

    session.connect('TOKEN', (error) => {
      if (error) {
        console.error('There was an error connecting to the session:', error.code, error.message);
        return;
      }

      // 세션에 성공적으로 연결되었습니다. 필요한 추가 작업을 수행하세요.
    });
  }, []);

  return <div id="video-container"></div>;
}

export default VideoComponent;
