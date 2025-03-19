import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    VALIDATE_TOKEN,
    VALIDATE_TOKEN_SUCCESS,
    VALIDATE_TOKEN_ERROR,
    SET_IS_VALID_TOKEN
} from "./actionType";

const initialState = {
    resetError: null,
    isValidToken: false,
    resetSuccessMsg: null,
    tokenValidationError: null,
    tokenValidationSuccess: null,
    loading: false,
    validatingToken: false,
};

const resetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case VALIDATE_TOKEN:
            return {
                ...state,
                validatingToken: true,
                tokenValidationError: null,
                tokenValidationSuccess: null,
                isValidToken: false, // Reset flag before validation
            };

        case VALIDATE_TOKEN_SUCCESS:
            return {
                ...state,
                validatingToken: false,
                tokenValidationSuccess: action.payload,
                isValidToken: true, // Set flag when token is valid
            };

        case VALIDATE_TOKEN_ERROR:
            return {
                ...state,
                validatingToken: false,
                tokenValidationError: action.payload,
                isValidToken: false, // Mark token as invalid
            };

        case SET_IS_VALID_TOKEN: // New case to handle explicit updates
            return {
                ...state,
                isValidToken: action.payload,
            };

        case RESET_PASSWORD:
            return {
                ...state,
                loading: true,
                resetError: null,
                resetSuccessMsg: null,
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                resetSuccessMsg: action.payload,
            };

        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                resetError: action.payload,
                resetSuccessMsg:""
            };

        default:
            return state;
    }
};

export default resetPasswordReducer;
