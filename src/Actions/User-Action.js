import axios from "axios";
import { server } from "./Index";

export const pendingLogin = (data) => async (dispatch) => {
  console.log("arrived");
  await axios.get(
    "https://chatapp-backend-ftdubcg7bafzfucf.japanwest-01.azurewebsites.net/sanctum/csrf-cookie"
  );
  const response = await server.post("./login", data);
  console.log("here", response.data.token);
  return response.data.token;
};

export const signup = (data) => async (dispatch) => {
  console.log("arrived");
  await axios.get(
    "https://chatapp-backend-ftdubcg7bafzfucf.japanwest-01.azurewebsites.net/sanctum/csrf-cookie"
  );
  const response = await server.post("./signup", data);
  console.log("here", response.data.token);
  return response.data.token;
};

export function fetchUser() {
  console.log("times");
  return (dispatch) => {
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
