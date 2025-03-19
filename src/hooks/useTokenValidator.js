import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StorageKeys } from "../common/storage-keys"
import { logoutUserSuccess } from "../store/actions"
import { validateToken } from "../helpers/jwt-token-validator"

const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes

const useTokenValidator = (interval = TOKEN_CHECK_INTERVAL) => {
  const {isAuthenticated} = useSelector(state => state.Login)
  const dispatch = useDispatch()
 
  const tokens = useMemo(() => {
    const jwtToken = localStorage.getItem(StorageKeys.token)
    return {
      jwtToken,
    }
  }, [])

  useEffect(()=>{
    // skip jwt validation if user is not authenticated
    if(!isAuthenticated || !tokens.jwtToken){ 
      if(isAuthenticated)dispatch(logoutUserSuccess())
      return
    }
    console.log("validating token")
    // validate and refresh your token here
    const validateAndRefreshToken = () => {
          const isValid = validateToken(tokens.jwtToken)
          if (!isValid) {
            dispatch(logoutUserSuccess())
            window.location.reload()
          }
    }
    const intervalId = setInterval(validateAndRefreshToken, interval)
    return () => clearInterval(intervalId)

  },[isAuthenticated,tokens.jwtToken])
}

export default useTokenValidator
