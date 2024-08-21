import { server } from "./Index";
import FormatDate from "./../Utils/FormatDate";
export function changeRoom(data) {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_ROOM",
      payload: data,
    });
  };
}

export function fetchRooms() {
  let rooms = [];
  console.log("once");
  return async (dispatch) => {
    //this action will be called at first connection and there is duplicate action is respect action files
    const groups = await server.get("./groups/");
    rooms = groups.data.data;
    dispatch({ type: "FETCH_GROUPS", payload: rooms });

    const friends = await server.get("./friends");
    rooms = [...rooms, ...friends.data.data];
    console.log("friends", friends);
    dispatch({ type: "FETCH_FRIENDS", payload: friends.data.data });

    rooms = rooms.map((room) => {
      if (room.latest_message) {
        const format_date = FormatDate(room.latest_message.created_at);
        room = {
          ...room,
          latest_message: { ...room.latest_message, format_date: format_date },
        };
      }
      return room;
    });
    rooms = rooms.slice().sort((a, b) => {
      const dateA = new Date(
        a.latest_message ? a.latest_message.created_at : a.created_at
      );
      const dateB = new Date(
        b.latest_message ? b.latest_message.created_at : b.created_at
      );

      if (!a.latest_message?.created_at) return 1;
      if (!b.latest_message?.created_at) return -1;

      return dateB - dateA;
    });
    dispatch({ type: "FETCH_ROOMS", payload: rooms });
    return rooms;
  };
}

export function addMessagesToRooms(messages, roomId, isGroup) {
  return (dispatch) => {
    dispatch({
      type: "ADD_MESSAGES_TO_ROOM",
      payload: { messages: messages, room_id: roomId, is_group: isGroup },
    });
  };
}

export function updateRooms(rooms) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_ROOMS",
      payload: rooms,
    });
  };
}
