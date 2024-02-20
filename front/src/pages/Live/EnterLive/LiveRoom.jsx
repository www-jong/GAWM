import React, { useEffect } from "react";
import UserVideoComponent from "../UserVideoComponent";
import ChatComponent from "../Chat/ChatComponent";
import { useLocation } from "react-router-dom";

export default function LiveRoom() {
  const location = useLocation();
  let {
    session,
    subscribers,
    mainStreamManager,
    chatDisplay,
    mySessionId,
    myUserName,
    publisher,
    deleted,
    isPublic,
    liveName,
    leaveSession,
    switchCamera,
    handleMainVideoStream,
    localUser,
    toggleChat,
    checkNotification,
    accessAllowed,
  } = location.state;

  console.log("mySessionId", mySessionId);
  console.log("localUser", localUser);
  console.log("subscribers", subscribers);
  return (
    <div id="session" style={{ width: "100vw", height: "100vh" }}>
      <div id="session-header">
        <input
          className="btn btn-large btn-danger"
          type="button"
          id="buttonLeaveSession"
          onClick={leaveSession}
          value="Leave session"
        />
        <input
          className="btn btn-large btn-success"
          type="button"
          id="buttonSwitchCamera"
          onClick={switchCamera}
          value="Switch Camera"
        />
      </div>
      <div id="video-container" className="col-md-6">
        {subscribers.map((sub, i) => (
          <div
            key={sub.id}
            className="stream-container col-md-6 col-xs-6"
            onClick={() => handleMainVideoStream(sub)}
          >
            <span>{sub.id}</span>
            <UserVideoComponent streamManager={sub} />
          </div>
        ))}
        {mainStreamManager !== undefined ? (
          <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
            <ChatComponent
              user={localUser}
              myStream={mainStreamManager}
              chatDisplay={chatDisplay}
              close={toggleChat}
              messageReceived={checkNotification}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
