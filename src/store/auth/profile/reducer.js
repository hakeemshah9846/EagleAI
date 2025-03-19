import {
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  EDIT_PROFILE,
  RESET_PROFILE_FLAG,
  LOADING,
  GET_PROFILE
} from "./actionTypes"

const cachedUserProfile = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : {
      ID: 1,
      Access_Role_Pro: null,
      Access_Role_Standard: null,
      Access_States: null,
      Account_Name_FM: null,
      Account_Name_Web: null,
      Address_Mailing_City: null,
      Address_Mailing_Country: null,
      Address_Mailing_Line_1: null,
      Address_Mailing_Line_2: null,
      Address_Mailing_Postal_Code: null,
      Address_Mailing_State: null,
      Address_Residence_City: null,
      Address_Residence_Country: null,
      Address_Residence_County_Code: null,
      Address_Residence_County_Name: null,
      Address_Residence_County_Precinct: null,
      Address_Residence_Line_1: null,
      Address_Residence_Line_2: null,
      Address_Residence_Postal_Code: null,
      Address_Residence_State: null,
      Email_Address: null,
      Email_Address_Is_Verified: false,
      Honorific: null,
      ID_FM: null,
      Is_Active: 1,
      Last_Login_DateTime_UTC: null,
      Name_First: null,
      Name_Last: null,
      Notes: null,
      Organization: null,
      Phone_Number: null,
      Photo: null,
      Referred_By: null,
      Voter_Registration_Date: null,
      Voter_Registration_Number: null ,
      z_Created_By:null,
      z_Created_DateTime_UTC: null,
      z_Modified_By:null,
      z_Modified_DateTime_UTC: null,
    }

const initialState = {
  error: "",
  success: "",
  loading: false,
  userDetails: cachedUserProfile,
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      state = { ...state }
      break
    case PROFILE_SUCCESS:
      state = { ...state, success: "success", userDetails: action.payload, loading: false }
      break
    case PROFILE_ERROR:
      state = { ...state, error: action.payload }
      break
    case RESET_PROFILE_FLAG:
      state = { ...state, success: null }
      break
    case GET_PROFILE:
      state = { ...state, loading: !state.loading }
      break
    case LOADING: 
      state = { ...state, loading: action?.payload ?? true }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default profile
