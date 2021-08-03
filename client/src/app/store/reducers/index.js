import { combineReducers } from "redux";
import fuse from "./fuse";
import auth from "app/auth/store/reducers";
import loginReducer from "app/auth/store/reducers/login.reducer";
import register from "app/auth/store/reducers/register.reducer";
import friend from "app/main/pages/profile/tabs/store/reducers/contact.reducer";
const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    fuse,
    register,
    friend,
    login: loginReducer,
    ...asyncReducers,
  });

export default createReducer;
