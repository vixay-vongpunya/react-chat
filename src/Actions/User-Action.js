import axios from "axios";
import { server } from "./Index";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
export const pendingLogin = (data) => async (dispatch) => {
  console.log("arrived");

  await axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/sanctum/csrf-cookie`
  );
  const response = await server.post("./login", data);
  console.log("here", response.data.token);
  return response.data.token;
};

export const signup = (data) => async (dispatch) => {
  console.log("arrived");
  await axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/sanctum/csrf-cookie`
  );
  const response = await server.post("./signup", data);
  console.log("here", response.data.token);
  return response.data.token;
};

export function fetchUser() {
  return (dispatch) => {
    console.log("before 3");
    server.get("./self").then((response) => {
      console.log("user", response);
      dispatch({ type: "FETCH_USER_DATA", payload: response.data.data });
    });
  };
}

export function clearState() {
  return (dispatch) => {
    console.log("clear");
    dispatch({ type: "RESET" });
  };
}
