import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE, GET_PROFILE } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeProfile,
  postJwtProfile,
  getUserProfile
} from "../../../helpers/fakebackend_helper" 
import { logoutUser } from "../login/actions"

const fireBaseBackend = getFirebaseBackend()

function* editProfile({ payload: { user } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.editProfileAPI,
        user.username,
        user.idx
      )
      yield put(profileSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtProfile, "/post-jwt-profile", {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeProfile, {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    }
  } catch (error) {
    yield put(profileError(error))
  }
}

function* getProfile () {
  try { 
     const response = yield call(getUserProfile)
     yield put(profileSuccess(response))
  } catch (error) {
    if(error?.status === 401){
      yield put(logoutUser())
    }
    yield put(profileError(error))
  }
}

export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile) 
}

export function* watchGetProfile() {
  yield takeEvery(GET_PROFILE, getProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile), fork(watchGetProfile)])
}

export default ProfileSaga
