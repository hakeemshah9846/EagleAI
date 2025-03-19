import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError, updateStatus } from "./actions"

// Include API Helper
import { post } from "../../../helpers/api_helper"
import { POST_FORGOT_PASSWORD } from "../../../helpers/url_helper"
import { STATUS } from "./reducer"

// If user is sent successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    yield put(updateStatus(STATUS.loading))
    const response = yield call(post, POST_FORGOT_PASSWORD, {
      email: user.email 
    })
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Reset link has been sent to your mailbox, check there first"
        )
      )
    } 
  } catch (error) {
    yield put(userForgetPasswordError(error?.message ?? "Failed to reset password. Try again.")) 
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
}

export default forgetPasswordSaga