import {
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    LOGOUT_USER_SUCCESS,
    API_ERROR,
    SET_LOADING_STATUS,
} from "./actionTypes"
import {StorageKeys} from "../../../common/storage-keys"

const cachedAuthStatus = localStorage.getItem(StorageKeys.authStatus) ?? false
const cachedAuthDetails  = localStorage.getItem(StorageKeys.authUser) ? JSON.parse(localStorage.getItem(StorageKeys.authUser)) : null
const initialState = {
    error: "",
    loading: false,
    authDetails: cachedAuthDetails,
    isAuthenticated:cachedAuthStatus
}

const Login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            state = {
                ...state,
                loading: true,
            }
            break
        case LOGIN_SUCCESS:
            state.authDetails = action.payload
            state.isAuthenticated = true
            localStorage.setItem(StorageKeys.authStatus,true)
            localStorage.setItem(StorageKeys.authUser,JSON.stringify(action.payload))
            localStorage.setItem(StorageKeys.token,JSON.stringify(action.payload?.access_token))
            state = {
                ...state,
                loading: false,
            }
            break
        case LOGOUT_USER: 
            state = { ...state }
            break
        case LOGOUT_USER_SUCCESS:
            localStorage.clear()
            state = { ...state,isAuthenticated:false,authDetails:null,error:"",loading:false  }
            break
        case API_ERROR:
            state = { ...state, error: action.payload, loading: false }
            break 
        case SET_LOADING_STATUS: 
             state = {...state, loading:action.payload}
             break
        default:
            state = { ...state }
            break
    }
    return state
}

export default Login
