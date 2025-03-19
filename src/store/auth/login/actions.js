import {
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    API_ERROR,
    SET_LOADING_STATUS
} from "./actionTypes"

export const loginUser = (user, history) => {
    return {
        type: LOGIN_USER,
        payload: { user, history },
    }
}

export const loginSuccess = user => {
    return {
        type: LOGIN_SUCCESS,
        payload: user,
    }
}

export const logoutUser = (history) => {
    return {
        type: LOGOUT_USER,
        payload: { history },
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: {},
    }
}

export const setLoadingStatus = status => { 
    return {
        type:SET_LOADING_STATUS,
        payload:status
    }
}

export const apiError = error => {
    return {
        type: API_ERROR,
        payload: error,
    }
}
