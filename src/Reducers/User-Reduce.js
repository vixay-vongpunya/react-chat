const defaultState = {
  data: [],
  loading: false,
};

function userReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case "FETCH_USER_DATA": {
   
      return {
        ...state,
        data: action.payload,
      };
    }
    case "UPDATE_USER_PROFILE": {
   
      return {
        ...state,
        data: action.payload,
      };
    }
    case "RESET": {
      return defaultState;
    }
    default:
      return state;
  }
}

export default userReducer;
