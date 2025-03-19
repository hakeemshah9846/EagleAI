import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; 
import useLoginSelector from "../../pages/Authentication/hooks/useLoginSelector";
import { Path } from "../allRoutes";
import useTokenValidator from "../../hooks/useTokenValidator";
import { useDispatch } from "react-redux";
import { getProfile } from "../../store/actions";

const Authmiddleware = ({ children }) => { 
    const { isAuthenticated } = useLoginSelector()
    useTokenValidator()
    const router = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
      if(!isAuthenticated){
        return router(Path.login)
      }else{
        dispatch(getProfile())
      }
    },[isAuthenticated])

    return <>{children}</>;
};

Authmiddleware.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Authmiddleware;
