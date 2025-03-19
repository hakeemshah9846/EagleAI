import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess, setLoadingStatus } from "./actions"

import {
    postLogin,
    postLogout, 
} from "../../../helpers/fakebackend_helper"


function* loginUser({ payload: { user, history } }) {
    try {
        yield put(setLoadingStatus(true))
        const response = yield call(postLogin, {
            account: user.account,
            password: user.password,
        })
        // handle jwt verification here 
        yield put(loginSuccess(response))
        // history("/dashboard")
        yield put(setLoadingStatus(false))
    } catch (error) {
        yield put(setLoadingStatus(false))
        yield put(apiError(error?.message))
    }
}

function* logoutUser({ payload: { history } }) {
    try { 
        yield put(setLoadingStatus(true))
        yield call(postLogout);
        yield put(logoutUserSuccess());
        yield put(setLoadingStatus(false))
        history('/login');
    } catch (error) {
        yield put(logoutUserSuccess());
        yield put(apiError(error));
        yield put(setLoadingStatus(false))
    }
}

function* authSaga() {
    yield takeEvery(LOGIN_USER, loginUser)
    yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
