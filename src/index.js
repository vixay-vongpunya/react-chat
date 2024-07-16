import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import Config from "./Config";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
window.Pusher = Pusher;

if (localStorage.getItem("token")) {
  Pusher.logToConsole = true;
  window.Echo = new Echo({
    broadcaster: "pusher",
    authEndpoint: "http://localhost:8000/api/broadcasting/auth",
    auth: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    },

    key: Config.REACT_APP_PUSHER_APP_KEY,
    cluster: Config.REACT_APP_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
