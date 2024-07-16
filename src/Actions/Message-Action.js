import { server } from "./Index";

export function sendMessage(data) {
  const socketId = window.Echo.socketId();
  return (dispatch) => {
    console.log("hey", data);
    server
      .post("/message", data, {
        headers: {
          "X-Socket-ID": socketId,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch({ type: "SEND_MESSAGE", payload: response.data.data });
      });
  };
}
export function fetchMessage(id, type) {
  return (dispatch) => {
    server.get(`./message/${id}?type=${type}`).then((response) => {
      console.log(response);
      dispatch({ type: "FETCH_MESSAGE", payload: response.data.data });
    });
  };
}
export function addMessage(message) {
  return (dispatch) => {
    dispatch({ type: "ADD_MESSAGE", payload: message });
  };
}
export function deleteMessage(message) {
  return (dispatch) => {
    dispatch({ type: "DELETE_MESSAGE", payload: message });
  };
}
