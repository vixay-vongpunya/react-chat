const defaultState = {
  data: [],
  loading: false,
};
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case "FETCH_USER_DATA": {
      console.log("check2", action.payload);
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
};
