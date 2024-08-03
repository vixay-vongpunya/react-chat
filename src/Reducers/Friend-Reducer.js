const defaultState = {
  data: [],
  pendingFriendship: [],
  loading: true,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case "FETCH_FRIENDS": {
      console.log("check data pass", action.payload);
      return {
        ...state,
        data: action.payload,
      };
    }
    case "FETCH_PENDING_FRIENDSHIP": {
      return {
        ...state,
        pendingFriendship: action.payload,
      };
    }
    case "DELETE_FRIENDSHIP": {
      return {
        ...state,
        data: state.data.filter(
          (friend) => friend.friendship_id !== action.payload.friendship_id
        ),
      };
    }
    case "ACCEPT_FRIENDSHIP": {
      return {
        ...state,
        data: [...state.data, action.payload],
        pendingFriendship: state.pendingFriendship.filter(
          (item) => item.friendship_id != action.payload.friendship_id
        ),
      };
    }
    case "DECLINE_FRIENDSHIP": {
      return {
        ...state,
        pendingFriendship: state.pendingFriendship.filter(
          (item) => item.friendship_id != action.payload.friendship_id
        ),
      };
    }
    case "RESET": {
      return defaultState;
    }

    default:
      return state;
  }
};
