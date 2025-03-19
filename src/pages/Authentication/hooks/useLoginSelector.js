import { useSelector } from "react-redux";
import { createSelector } from "reselect"; 

const useLoginSelector = () => {
    const selectLoginState = (state) => state.Login;
    const LoginProperties = createSelector(
        selectLoginState,
        (login) => ({
            error: login.error,
            ...login
        })
    );  
   return useSelector(LoginProperties);
}

export default useLoginSelector