const defaultState = {
  rooms: [],
  data: [],
  loading: true,
};

function filterRoom(room, data) {
  if (room.id === data.id) {
    if (data.users && !room.email) {
      return data;
    } else if (!data.users && room.email) {
      return data;
    }
  }
  return room;
}

function roomReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case "FETCH_ROOMS": {
      return {
        ...state,
        rooms: action.payload,
        loading: false,
      };
    }
    case "DELETE_FRIENDSHIP": {
      return {
        ...state,
        rooms: state.rooms.filter(function (friend) {
          return friend.friendship_id !== action.payload.friendship_id;
        }),
      };
    }
    case "LEAVE_GROUP": {
      return {
        ...state,
        rooms: state.rooms.filter(function (group) {
          return group.id !== action.payload.id;
        }),
      };
    }
    case "CHANGE_ROOM": {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case "DELETE_MESSAGE": {
      return {
        ...state,
        data: {
          ...state.data,
          messages: state.data.messages.filter(function (message) {
            return message.id !== action.payload.id;
          }),
        },
      };
    }

    case "ADD_MESSAGES_TO_ROOM":
      return {
        ...state,
        rooms: state.rooms.map(function (room) {
          if (room.id === action.payload.room_id) {
            if (action.payload.is_group && !room.email) {
              return {
                ...room,
                messages: action.payload.messages,
              };
            } else if (!action.payload.is_group && room.email) {
              return {
                ...room,
                messages: action.payload.messages,
              };
            }
          }
          return room;
        }),
      };
    case "UPDATE_ROOMS":
      return {
        ...state,
        rooms: action.payload,
      };

    case "UPDATE_ROOM_MESSAGE":
      const updatedRoom = action.payload;
      return {
        ...state,
        rooms: state.rooms.map(function (room) {
          return filterRoom(room, updatedRoom);
        }),
      };

    case "UPDATE_GROUP_DETAIL":
      const data = {
        ...state.data,
        bio: action.payload.bio,
        name: action.payload.name,
      };
      return {
        ...state,
        data: data,
        rooms: state.rooms.map(function (room) {
          return filterRoom(room, data);
        }),
      };

    case "UPDATE_GROUP_PROFILE_IMAGE":
      const updatedGroupProfile = {
        ...state.data,
        profile: { ...state.data.profile, profile_image: action.payload },
      };

      return {
        ...state,
        data: updatedGroupProfile,
        rooms: state.rooms.map(function (room) {
          return filterRoom(room, updatedGroupProfile);
        }),
      };
    case "UPDATE_GROUP_BACKGROUND_IMAGE":
      const updatedGroupBackground = {
        ...state.data,
        profile: { ...state.data.profile, background_image: action.payload },
      };
      return {
        ...state,
        data: updatedGroupBackground,
        rooms: state.rooms.map(function (room) {
          return filterRoom(room, updatedGroupBackground);
        }),
      };
    case "RESET": {
      return defaultState;
    }
    default:
      return state;
  }
}

export default roomReducer;
