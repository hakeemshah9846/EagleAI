 import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  UPDATE_STATUS
} from "./actionTypes"

export const STATUS = {
  loading:"loading",
  idle:"idle",
  success:"success",
  failure:"failure"
}
const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  status:STATUS.idle
}

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
      }
      break
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccessMsg: action.payload,
        status:STATUS.idle
      }
      break
    case FORGET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload, status:STATUS.idle }
      break
    case UPDATE_STATUS:
      state = { ...state, status: action.payload }
      break

    default:
      state = { ...state }
      break
  }
  return state
}

export default forgetPassword
