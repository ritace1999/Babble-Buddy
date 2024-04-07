import { userActions } from "../reducers/userReducer.js";
export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
};
