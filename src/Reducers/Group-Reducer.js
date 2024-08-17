const defaultState = {
  data: [],
  loading: false,
};
function groupReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case "FETCH_GROUPS": {
      return {
        ...state,
        data: action.payload,
      };
    }
    case "LEAVE_GROUP": {
      return {
        ...state,
        data: state.data.filter((group) => group.id !== action.payload.id),
      };
    }
    case "ADD_MEMBER": {
      // const newData = state.data.filter(group=>group.id !== action.payload.id)
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
export default groupReducer;
