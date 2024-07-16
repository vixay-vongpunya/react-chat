import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers/Index";

const store = configureStore({ reducer: rootReducer });
export default store;
