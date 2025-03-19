import {
    RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
    VALIDATE_TOKEN, VALIDATE_TOKEN_SUCCESS, VALIDATE_TOKEN_ERROR
} from "./actionType";

// Validate Reset Token - Request
export const validateResetToken = (token) => ({
    type: VALIDATE_TOKEN,
    payload: { token }
});

// Validate Reset Token - Success
export const validateResetTokenSuccess = (message) => ({
    type: VALIDATE_TOKEN_SUCCESS,
    payload: message,
});

// Validate Reset Token - Error
export const validateResetTokenError = (message) => ({
    type: VALIDATE_TOKEN_ERROR,
    payload: message,
});

// Reset Password - Request
export const userResetPassword = (token, newPassword, confirmPassword) => ({
    type: RESET_PASSWORD,
    payload: { token, newPassword, confirmPassword },
});

// Reset Password - Success
export const userResetPasswordSuccess = (message) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: message,
});

// Reset Password - Error
export const userResetPasswordError = (message) => ({
    type: RESET_PASSWORD_ERROR,
    payload: message,
});
