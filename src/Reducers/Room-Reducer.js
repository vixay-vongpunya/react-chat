const defaultState = {
  rooms: [],
  data: [],
  loading: true,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case "FETCH_ROOMS": {
      const rooms = action.payload.slice().sort((a, b) => {
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

      return {
        ...state,
        rooms: rooms,
      };
    }
    case "DELETE_FRIENDSHIP": {
      return {
        ...state,
        rooms: state.rooms.filter(
          (friend) => friend.friendship_id !== action.payload.friendship_id
        ),
      };
    }
    case "LEAVE_GROUP": {
      return {
        ...state,
        rooms: state.rooms.filter((group) => group.id !== action.payload.id),
      };
    }
    case "CHANGE_ROOM": {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }

    case "UPDATE_GROUP_DETAIL":
      return {
        ...state,
        data: {
          ...state.data,
          bio: action.payload.bio,
          name: action.payload.name,
        },
      };

    case "UPDATE_PROFILE_IMAGE":
      return {
        ...state,
        data: {
          ...state.data,
          profile: { ...state.data.profile, profile_image: action.payload },
        },
      };
    case "UPDATE_BACKGROUND_IMAGE":
      return {
        ...state,
        data: {
          ...state.data,
          profile: { ...state.data.profile, background_image: action.payload },
        },
      };
    default:
      return state;
  }
};
