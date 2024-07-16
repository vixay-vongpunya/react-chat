import { server } from "./Index";
import axios from "axios";
export function login(data) {
  return (dispatch) => {
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then((a) => {
      server.post("http://localhost:8000/api/login", data).then((response) => {
        localStorage.setItem("token", response.data.token);
        dispatch({ type: "FETCH_USER_DATA", payload: response.data.data });
      });
    });
  };
}
export function fetchUser() {
  console.log("times");
  return (dispatch) => {
    server.get("./self").then((response) => {
      console.log("user", response);
      dispatch({ type: "FETCH_USER_DATA", payload: response.data.data });
    });
  };
}
