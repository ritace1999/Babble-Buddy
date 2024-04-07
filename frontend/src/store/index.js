import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../store/reducers/userReducer.js";
import conversationReducer from "./reducers/conversationReducer.js";

const userInfoFromStorage =
  typeof window !== "undefined"
    ? localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account"))
      : null
    : null;

const initialState = {
  user: { userInfo: userInfoFromStorage },
};
const store = configureStore({
  reducer: {
    user: userReducer,
    conversation: conversationReducer,
  },
  preloadedState: initialState,
});
export default store;
