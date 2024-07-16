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
    default:
      return state;
  }
};
