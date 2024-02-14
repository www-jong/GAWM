import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../UserVideoComponent.jsx";
import UserModel from "../models/user-model.jsx";
import ChatComponent from "../Chat/ChatComponent.jsx";

var localUser = new UserModel();
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/";

class EnterLive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      liveName: "26C 라이브 이름",
      isPublic: true,
      deleted: false,
      token: "initial token",
      localUser: undefined,
      chatDisplay: "block",
      accessAllowed: false,
    };

    // Bind this to the event handlers
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleChangeIspublic = this.handleChangeIspublic.bind(this);
    this.handleChangeLiveName = this.handleChangeLiveName.bind(this);
    this.handleChangeDeleted = this.handleChangeDeleted.bind(this);
    this.handleChangeToken = this.handleChangeToken.bind(this);
    this.handleChangeSubscribers = this.handleChangeSubscribers.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.onChat = this.onChat.bind(this);
    this.handleChangeSubscribers = this.handleChangeSubscribers.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeLiveName(e) {
    this.setState({
      liveName: e.target.value,
    });
  }

  handleChangeToken(e) {
    this.setState({
      token: e.target.value,
    });
  }

  handleChangeIspublic(e) {
    this.setState({
      isPublic: e.target.value,
    });
  }

  handleChangeSubscribers(e){

    this.OV = new OpenVidu();

     this.setState(
      {
        session: this.OV.initSession(),
      });
      
    var mySession = this.state.session;
    console.log(mySession);
      mySession.on("streamCreated", (event) => {
      var subscriber = mySession.subscribe(event.stream, undefined);
      console.log("subscriber: ",subscriber);
      var subscribers = this.state.subscribers;
      console.log(subscribers);
      console.log(subscriber);
      subscribers.push(subscriber);
    
      
      this.setState({
        subscribers: subscribers,
      });
    });
    console.log("handleChangeSubscriber: " , this.state.subscribers);
  }


  handleChangeDeleted(event) {
    const isChecked = event.target.checked;
    this.setState({ deleted: isChecked });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
      localUser.setStreamManager(stream);
    }
  }

  handleChangeSubscribers(e) {
    this.setState({
      subscribers: e.target.value,
    });
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

   async joinSession() {
    event.preventDefault();
    if (this.state.mySessionId && this.state.myUserName) {
      const token = await this.getToken();
      console.log(token);
      this.setState({
        token: token,
        session: true,
      });
    }

    this.OV = new OpenVidu();

     this.setState(
      {
        session: this.OV.initSession(),
      },
         () => {
          // this.handleChangeSubscribers();
        var mySession = this.state.session;
        
         mySession.on("streamCreated", (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined);
          // console.log("subscriber: ",subscriber);
          var subscribers = this.state.subscribers;
          // console.log(subscribers);
          // console.log(subscriber);
          subscribers.push(subscriber);
<<<<<<< HEAD
       
          
=======

          // const data = { name: "subscriber", data: subscriber };
          // console.log(data);
          if (subscriber.stream != null) {
            console.log("담았다!");
            this.handleMainVideoStream(subscriber);
            const data = { name: "담은거", subscriber };
            console.log(data);
          }

>>>>>>> 0dbe4f4ea3b7f7b849e76d820ab47bb6496fb102
          this.setState({
            subscribers: subscribers,
          });
        });

        mySession.on("streamDestroyed", (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });

        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // const token = await this.getToken();

        mySession
          .connect(this.state.token, { clientData: this.state.myUserName })
          .then(  () =>  {
            // let publisher = await this.OV.initPublisherAsync(undefined, {
            //   audioSource: undefined,
            //   videoSource: undefined,
            //   publishAudio: true,
            //   publishVideo: true,
            //   resolution: "640x480",
            //   frameRate: 30,
            //   insertMode: "APPEND",
            //   mirror: false,
            // });
            

            // mySession.publish(publisher);

             localUser.setNickname(this.state.myUserName);
             localUser.setConnectionId(this.state.session.connection.connectionId);
             localUser.setScreenShareActive(true);
             localUser.setStreamManager(publisher);
             localUser.setType("remote");
             localUser.setAudioActive(true);
             localUser.setVideoActive(true);

            // var devices = await this.OV.getDevices();
            // var videoDevices = devices.filter((device) => device.kind === "videoinput");
            // var currentVideoDeviceId = publisher.stream
            //   .getMediaStream()
            //   .getVideoTracks()[0]
            //   .getSettings().deviceId;
            // var currentVideoDevice = videoDevices.find(
            //   (device) => device.deviceId === currentVideoDeviceId
            // );

            // this.setState({
            //   currentVideoDevice: currentVideoDevice,
            //   mainStreamManager: publisher,
            //   publisher: publisher,
            // });
          })
          .catch((error) => {
            console.log("There was an error connecting to the session:", error.code, error.message);
          });
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
      isPublic: undefined,
      deleted: undefined,
      liveName: undefined,
      chatDisplay: "none",
      accessAllowed: false,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter((device) => device.kind === "videoinput");

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await this.state.session.unpublish(this.state.mainStreamManager);
          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: display });
    }
  }

  onChat(property) {
    let display = property;
    console.log("chat", display);
    this.setState({ chatDisplay: display });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const isPublic = this.state.isPublic;
    const liveName = this.state.liveName;
    const deleted = this.state.deleted;
    this.handleChangeSubscribers();
    // const subscribers = this.state.subscribers;
    var chatDisplay = { display: this.state.chatDisplay };
    console.log("vdvd");
    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>

                <p>
                  <label> isPublic : </label>
                  <label class="switch">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={this.state.isPublic}
                      onChange={this.handleChangeIspublic}
                    />
                    <span class="slider"></span>
                  </label>
                </p>
                <p>
                  <label> liveName: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="liveName"
                    value={liveName}
                    onChange={this.handleChangeLiveName}
                    required
                  />
                </p>

                <p>
                  <label> 세션 비우기 : </label>
                  <label class="switch">
                    <input
                      type="checkbox"
                      id="deleted"
                      checked={this.state.deleted}
                      onChange={this.handleChangeDeleted}
                    />
                    <span class="slider"></span>
                  </label>
                </p>

                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">{mySessionId}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={this.switchCamera}
                value="Switch Camera"
              />
              {/* <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchChat"
                onClick={this.onChat}
                value="ON/OFF Chat"
              /> */}
            </div>

            {/* {this.state.mainStreamManager !== undefined ? (
              <div id="main-video" className="col-md-6">
                <UserVideoComponent streamManager={this.state.mainStreamManager} />
              </div>
            ) : null} */}
            <div id="video-container" className="col-md-6">
              {/* {this.state.publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(this.state.publisher)}
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null} */}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={sub.id}
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
<<<<<<< HEAD

              <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  subscribers={this.state.subscribers}
                />
              </div>
=======
              {this.state.mainStreamManager !== undefined ? (
                <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
                  <ChatComponent
                    user={localUser}
                    myStream={this.mainStreamManager}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    messageReceived={this.checkNotification}
                  />
                </div>
              ) : null}
>>>>>>> 0dbe4f4ea3b7f7b849e76d820ab47bb6496fb102
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  async getToken() {
    const sessionId = await this.createSession(
      this.state.mySessionId,
      this.state.liveName,
      this.state.isPublic,
      this.state.deleted
    );
    return await this.createToken(this.state.mySessionId);
  }

  async createSession(sessionId, liveName, isPublic, deleted) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "gawm/back/api/sessions",
      {
        customSessionId: sessionId,
        liveName: liveName,
        isPublic: isPublic,
        deleted: deleted,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  }

  async createToken(liveRoomId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "gawm/back/api/sessions/" + liveRoomId + "/connections",
      { customSessionId: liveRoomId },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  }
}

export default EnterLive;
