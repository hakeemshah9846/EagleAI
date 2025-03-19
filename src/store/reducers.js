import { combineReducers } from "redux";

// Frontend Layout
import Layout from "./layout/reducer";

// Authentication Modules
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import ResetPassword from "./auth/resetpwd/reducer";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    ResetPassword,
});

export default rootReducer;
