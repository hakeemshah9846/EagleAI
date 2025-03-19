import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { RESET_PASSWORD, VALIDATE_TOKEN, SET_IS_VALID_TOKEN, VALIDATE_TOKEN_SUCCESS, VALIDATE_TOKEN_ERROR } from "./actionType";
import {
    userResetPasswordSuccess,
    userResetPasswordError 
} from "./action";
import { post, get } from "../../../helpers/api_helper";
import { POST_RESET_PASSWORD, VALIDATE_RESET_TOKEN } from "../../../helpers/url_helper";

// Validate Reset Token
function* validateToken({ payload: { token } }) {
    try {
        const response = yield call(get, VALIDATE_RESET_TOKEN.replace("{token}", token));
        const responseStatus = response?.message?.toLowerCase()
        const successStatus = "success." 
        if (responseStatus === successStatus) { 
            yield put({ type: VALIDATE_TOKEN_SUCCESS, payload: "Token is valid. Proceed with resetting password." });
            yield put({ type: SET_IS_VALID_TOKEN, payload: true }); // New action to update `isValidToken`
        }
    } catch (error) {
        console.log("setting token as invalid")
        yield put({ type: VALIDATE_TOKEN_ERROR, payload: "Invalid or expired reset token." });
        yield put({ type: SET_IS_VALID_TOKEN, payload: false }); // Mark token as invalid
    }
}


// Reset Password
function* resetUserPassword({ payload: { token, newPassword, confirmPassword } }) {
    try {
        const response = yield call(post, POST_RESET_PASSWORD.replace("{token}", token), {
            password: newPassword,
            confirmPassword: confirmPassword
        });

        if (response) {
            yield put(userResetPasswordSuccess("Password reset successfully! You can now log in."));
        }
    } catch (error) {
        yield put(userResetPasswordError("Failed to reset password. Try again."));
    }
}



export function* watchUserPasswordReset() {
    yield takeEvery(RESET_PASSWORD, resetUserPassword);
}

export function* watchValidateResetToken() {
    yield takeEvery(VALIDATE_TOKEN, validateToken);
}

function* resetPasswordSaga() {
    yield all([fork(watchValidateResetToken), fork(watchUserPasswordReset)]);
}

export default resetPasswordSaga;
