import { server } from "./Index";
import FormatDate from "./../Utils/FormatDate";
export function changeRoom(data) {
  return async (dispatch) => {
    let newData = data;
    if (data && data.pivot) {
      try {
        const response = await server.get(`./group/${data.id}`);
        newData = response.data.data;
      } catch (error) {
        console.error(error);
      }
    }
    dispatch({
      type: "CHANGE_ROOM",
      payload: newData,
    });
  };
}

export function fetchRooms() {
  let rooms = [];
  console.log("once");
  return async (dispatch) => {
    await server.get("./groups/").then((response) => {
      rooms = response.data.data;
      dispatch({ type: "FETCH_GROUPS", payload: response.data.data });
    });
    await server.get("./friends").then((response) => {
      rooms = [...rooms, ...response.data.data];
      dispatch({ type: "FETCH_FRIENDS", payload: response.data.data });
    });
    rooms = rooms.map((room) => {
      if (room.latest_message) {
        const format_date = FormatDate({
          date: room.latest_message.created_at,
        });
        room = {
          ...room,
          latest_message: { ...room.latest_message, format_date: format_date },
        };
      }
      return room;
    });
    dispatch({ type: "FETCH_ROOMS", payload: rooms });
  };
}

export function updateGroupDetail(id, data) {
  console.log("here na", id, data);
  return (dispatch) => {
    server.put(`./group/detail/${id}`, data).then((response) => {
      console.log(response);
      dispatch({ type: "UPDATE_GROUP_DETAIL", payload: data });
    });
  };
}
export function updateProfile(id, data, dataUrl) {
  return (dispatch) => {
    server
      .post(`./group/profile/${id}`, data)
      .then((response) =>
        dispatch({ type: "UPDATE_PROFILE_IMAGE", payload: dataUrl })
      );
  };
}
export function updateBackground(id, data, dataUrl) {
  return (dispatch) => {
    server
      .post(`./group/background/${id}`, data)
      .then((response) =>
        dispatch({ type: "UPDATE_BACKGROUND_IMAGE", payload: dataUrl })
      );
  };
}
