import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import EnterLive from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<EnterLive />, document.getElementById("root"));
registerServiceWorker();
