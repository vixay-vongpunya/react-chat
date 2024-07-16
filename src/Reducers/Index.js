import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./User-Reduce";
import messageReducer from "./Message-Reducer";
import friendReducer from "./Friend-Reducer";
import roomReducer from "./Room-Reducer";
import groupReducer from "./Group-Reducer";
const rootReducer = combineReducers({
  userStore: userReducer,
  messageStore: messageReducer,
  friendStore: friendReducer,
  roomStore: roomReducer,
  groupStore: groupReducer,
});
export default rootReducer;
