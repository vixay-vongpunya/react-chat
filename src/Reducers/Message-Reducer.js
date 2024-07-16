const defaultState = {
  userMessage: "",
  data: [],
  loading: false,
};

export default (state = defaultState, action = {}) => {
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
    case "DELETE_MESSAGE": {
      return {
        ...state,
        data: state.data.filter((message) => message.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};
