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
export function fetchMessage(room) {
  const type = room.email ? "user" : "group";
  const id = room.email ? room.friendship.id : room.id;
  return async (dispatch) => {
    const response = await server.get(`./room/${id}/messages?type=${type}`);
    const messages = response.data.data;
    dispatch({ type: "FETCH_MESSAGE", payload: messages });
    return messages;
  };
}
export function addMessage(message) {
  return (dispatch) => {
    dispatch({ type: "ADD_MESSAGE", payload: message });
  };
}

//go to room reducer
export function updateRoomMessage(room) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_ROOM_MESSAGE",
      payload: room,
    });
  };
}
