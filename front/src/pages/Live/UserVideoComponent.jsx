import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo.jsx";
import "./UserVideo.css";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return React.createElement(
      "div",
      null,
      this.props.streamManager !== undefined
        ? React.createElement(
            "div",
            { className: "streamcomponent" },
            React.createElement(OpenViduVideoComponent, {
              streamManager: this.props.streamManager,
            }),
            React.createElement("div", null, React.createElement("p", null, this.getNicknameTag()))
          )
        : null
    );
  }
}
