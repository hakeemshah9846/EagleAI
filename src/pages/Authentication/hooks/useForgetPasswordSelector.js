import { useSelector } from "react-redux";
import { createSelector } from "reselect"
const useForgetPasswordSelector = () => {
    const selectForgotPasswordState = (state) => state.ForgetPassword;
    const ForgotPasswordProperties = createSelector(
        selectForgotPasswordState,
            (forgetPassword) => ({
                forgetError: forgetPassword.forgetError,
                forgetSuccessMsg: forgetPassword.forgetSuccessMsg,
                status: forgetPassword.status
            })
        );

    return useSelector(ForgotPasswordProperties);
}

export default useForgetPasswordSelector