import React, { Component } from 'react';

import './App.css';
import cookies from 'js-cookie';
import axios from 'axios';
import OpenViduSession from 'openvidu-react';

class App extends Component {
    constructor(props) {
        super(props);
        this.APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/';
        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
            token: undefined,
            liveName: '26°C 라이브',
            isPublic: true,
            deleted: false,
        };

        this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
        this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
        this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.joinSession = this.joinSession.bind(this);
        this.handlerChangeLiveName= this.handlerChangeLiveName.bind(this);
        this.handlerChangeIsPublic = this.handlerChangeIsPublic.bind(this);
        this.handlerChangeDelete = this.handlerChangeDelete.bind(this);
    }

    handlerChangeLiveName(e){
        this.setState({
            liveName: e.target.value,
        })
    }

    handlerChangeDelete(e){
        this.setState({
            deleted : e.target.value,
        })
    }

    handlerChangeIsPublic(e){
        this.setState({
            isPublic: e.target.value,
        })
    }

    handlerJoinSessionEvent() {
        console.log('Join session');
    }

    handlerLeaveSessionEvent() {
        console.log('Leave session');
        this.setState({
            session: undefined,
        });
    }

    handlerErrorEvent() {
        console.log('Leave session');
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    async joinSession(event) {
        event.preventDefault();
        if (this.state.mySessionId && this.state.myUserName) {
            const token = await this.getToken();
            this.setState({
                token: token,
                session: true,
            });
        }
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const token = this.state.token;
        const liveName = this.state.liveName;
        const isPublic = this.state.isPublic;
        const deleted = this.state.deleted;
        return (
            <div>
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="join-dialog">
                            <h1> Join a video session </h1>
                            <form onSubmit={this.joinSession}>
                                <p>
                                    <label>Participant: </label>
                                    <input
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
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> LiveName: </label>
                                    <input
                                        type="text"
                                        id="liveName"
                                        value={liveName}
                                        onChange={this.handleChangeLiveName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> isPublic: </label>
                                    <input
                                        type="checkbox"
                                        id="isPublic"
                                        checked={this.state.isPublic}
                                        onChange={this.handlerChangeIsPublic}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> 퇴장하기 : </label>
                                    <input
                                        type="checkbox"
                                        id="deleted"
                                        checked={this.state.deleted}
                                        onChange={this.handlerChangeDelete}
                                    />
                                </p>
                                <p>
                                    <input name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div id="session">
                        <OpenViduSession
                            id="opv-session"
                            sessionName={mySessionId}
                            user={myUserName}
                            token={token}
                            liveName={liveName}
                            isPublic={isPublic}
                            deleted = {deleted}
                            joinSession={this.handlerJoinSessionEvent}
                            leaveSession={this.handlerLeaveSessionEvent}
                            error={this.handlerErrorEvent}
                        />
                    </div>
                )}
            </div>
        );
    }


    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     * 
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     * 
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId, this.state.liveName, this.state.isPublic, this.state.deleted);
        return await this.createToken(sessionId);
    }

    // async createSession(sessionId, liveName, isPublic, deleted) {
    //     const response = await axios.post(this.APPLICATION_SERVER_URL + 'gawm/back/api/sessions', 
    //     { customSessionId: sessionId , name: liveName , isPublic: isPublic, deleted: deleted}, {
    //         headers: { 'Content-Type': 'application/json', },
    //     });
    //     return response.data; // The sessionId
    // }

   

    async createSession(sessionId, liveName, isPublic, deleted) {
        // console.log(document.cookies.get('sessionId'));
        const response = await axios.post(this.APPLICATION_SERVER_URL+'gawm/back/api/sessions',  { customSessionId: sessionId , name: liveName , isPublic: isPublic, deleted: deleted}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : cookies.get('sessionId'),
          },
          withCredentials: true 
        });
        return response.data;
      }
    /**
     * Backend API 서버 요청 Promise를 생성하는 데 사용되는 axios 객체입니다
     */

    async createToken(sessionId) {
        console.log(cookies.get('sessionId'));
        const response = await axios.post(this.APPLICATION_SERVER_URL + 'gawm/back/api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', Authorization : cookies.get('sessionId'),},
            withCredentials: true 
        });
        return response.data; // The token
    }


}

export default App;
