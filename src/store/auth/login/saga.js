import { call, put, takeEvery } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  setLoadingStatus,
} from "./actions"

import { postLogin, postLogout } from "../../../helpers/fakebackend_helper"
import { delay } from "lodash"

function* loginUser({ payload: { user, history } }) {
  try {
    yield put(setLoadingStatus(true))
    const response = yield call(postLogin, {
      account: user.account,
      password: user.password,
    })
    // handle jwt verification here
    yield put(loginSuccess(response))
    history("/dashboard")
    yield put(setLoadingStatus(false))
  } catch (error) {
    yield put(setLoadingStatus(false))
    yield put(apiError(error?.message))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    console.log("logout user saga...");
      yield put(setLoadingStatus(true))
      yield call(postLogout)
      yield put(logoutUserSuccess())
      yield history("/login")
      yield put(setLoadingStatus(false))
  } catch (error) {
    console.log("cache error : ", error);
    yield put(logoutUserSuccess())
    yield put(apiError(error))
    yield history("/login")
    yield put(setLoadingStatus(false))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
