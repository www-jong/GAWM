import React, { useRef, useState } from "react";
import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../components/openvidu/UserVideoComponent.jsx";
import getEnv from "../utils/getEnv";
import { useSelector } from "react-redux";

const UseOpenViduSession = () => {
  const APPLICATION_SERVER_URL = getEnv("OPENVIDU_URL");
  const OPENVIDU_SERVER_SECRET = getEnv("OPENVIDU_SECRET");

  const userInfo = useSelector((state) => state.user.value);

  // TODO 세션 ID props에서 받아서 수정
  const [mySessionId, setMySessionId] = useState("15552030");
  const [myUserName, setMyUserName] = useState(
    userInfo.memberType === "VOLUNTEER"
      ? `${userInfo.volunteerName} 봉사자`
      : `${userInfo.childName} 학생`
  );

  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const OV = useRef();

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  // 사용자 화상 화면 렌더링
  const renderUserVideoComponent = (stream) => {
    let key = "";
    if (stream) {
      key = stream.stream.connection.connectionId;
    }

    return (
      <div id="participant-video" key={key}>
        <UserVideoComponent streamManager={stream} />
      </div>
    );
  };

  /**
   * 카메라 상태를 토글합니다.
   * 카메라가 켜져 있으면 끄고, 꺼져 있으면 켭니다.
   */
  const toggleCamera = (isMyCameraOn) => {
    if (publisher !== undefined) {
      publisher.publishVideo(isMyCameraOn);
    }
  };

  /**
   * 마이크 상태를 토글합니다.
   * 마이크가 켜져 있으면 끄고, 꺼져 있으면 켭니다.
   */
  const toggleMic = (isMyMicOn) => {
    if (publisher !== undefined) {
      publisher.publishAudio(isMyMicOn);
    }
  };

  // 이미 세션이 존재하는지 확인하는 method
  const getSession = async (sessionId) => {
    try {
      const response = await axios.get(`${APPLICATION_SERVER_URL}api/sessions/${sessionId}`, {
        headers: {
          Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
        },
      });
      return response.data; // If the request succeeds, then return session object
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null; // If the server responds with a 404 error, then the session does not exist
      }
      throw error; // For any other type of error, rethrow it
    }
  };

  // 세션을 생성하는 메소드
  const createSession = async (sessionId) => {
    let tempSession = await getSession(sessionId);

    if (tempSession == null) {
      const response = await axios.post(
        `${APPLICATION_SERVER_URL}api/sessions`,
        { customSessionId: sessionId },
        {
          headers: {
            Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
          },
        }
      );
      tempSession = response.data;
    } else {
      console.log(`${sessionId} session already exists.`);
    }
    return tempSession;
  };

  // Openvidu 서버에 세션 바탕으로 토큰 요청
  const createToken = async (tempSession) => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${tempSession.id}/connection`,
      {},
      {
        headers: {
          Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
        },
      }
    );
    return response.data.token; // token
  };

  // 토큰 리턴
  const getToken = async () => {
    const tempSession = await createSession(mySessionId);
    return createToken(tempSession);
  };

  // 내 stream의 구독자를 삭제
  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager, 0);
      if (index > -1) {
        // 배열에서 특정 요소를 제거하기 위해 filter 메소드를 사용
        return prevSubscribers.filter((_, i) => i !== index);
      }
      // 만약 찾는 요소가 없다면 원래의 배열을 그대로 반환
      return prevSubscribers;
    });
  };

  const joinSession = async () => {
    OV.current = new OpenVidu();

    const mySession = OV.current.initSession();

    setSession(mySession);

    mySession.on("streamCreated", (event) => {
      try {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((subs) => [...subs, subscriber]);
      } catch (err) {
        console.log("존재하지 않는 구독자 세션입니다");
      }
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    const token = await getToken();
    mySession
      .connect(token, { clientData: myUserName })
      .then(async () => {
        const publisherInstance = await OV.current.initPublisherAsync("#my-video", {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
        });

        mySession.publish(publisherInstance);

        const devices = await OV.current.getDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const currentVideoDeviceId = publisherInstance.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId;
        const currentVideoDeviceObj = videoDevices.find(
          (device) => device.deviceId === currentVideoDeviceId
        );

        setMainStreamManager(publisherInstance);
        setPublisher(publisherInstance);
        setCurrentVideoDevice(currentVideoDeviceObj);
      })
      .catch((error) => {
        console.log("There was an error connecting to the session:", error.code, error.message);
      });
  };

  return {
    session,
    mainStreamManager,
    subscribers,
    joinSession,
    renderUserVideoComponent,
    toggleCamera,
    toggleMic,
  };
};

export default UseOpenViduSession;
