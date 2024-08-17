const defaultState = {
  userMessage: "",
  data: [],
  loading: false,
};

function messageReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case "SEND_MESSAGE": {
      return {
        ...state,
        userMessage: action.payload,
      };
    }

    case "ADD_MESSAGE": {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case "FETCH_MESSAGE": {
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

export default messageReducer;
