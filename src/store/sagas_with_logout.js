import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga_with_logout" // Updated to use the new saga
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"

export default function* rootSaga() {
    yield all([
        //public
        AccountSaga(),
        fork(AuthSaga),
        ProfileSaga(),
        ForgetSaga(),
        fork(LayoutSaga),
    ])
}
