import { PROFILE_ERROR,GET_PROFILE, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG, LOADING } from "./actionTypes"

export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  }
}

export const profileSuccess = msg => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}


export const getProfile = () => {
  return {
    type: GET_PROFILE,
  }
}

export const toggleLoading = (payload) => {
  return {
    type: LOADING,
    payload
  }
}