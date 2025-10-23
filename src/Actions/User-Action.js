import axios from "axios";
import { server } from "./Index";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
export const pendingLogin = (data) => async (dispatch) => {
   

  await axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/sanctum/csrf-cookie`,
    {withCredentials: true},
  );
  const response = await server.post("./login", data);
   
  return response.data.token;
};

export const signup = (data) => async (dispatch) => {
   
  await axios.get(
    `${process.env.REACT_APP_BACKEND_API_URL}/sanctum/csrf-cookie`,
    {withCredentials: true},
  );
  const response = await server.post("./signup", data);
   
  return response.data.token;
};

export function fetchUser() {
  return (dispatch) => {
   
    server.get("./self").then((response) => {
   
      dispatch({ type: "FETCH_USER_DATA", payload: response.data.data });
    });
  };
}
export function updateUserProfile(profile) {
  return (dispatch) => {
    dispatch({ type: "UPDATE_USER_PROFILE", payload: profile });
  };
}

export function clearState() {
  return (dispatch) => {
   
    dispatch({ type: "RESET" });
  };
}
