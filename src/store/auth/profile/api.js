import { get, post, put } from "../../../helpers/api_helper"

class ProfileAPI {
  static GET_PROFILE = "/auth/me"
  static UPDATE_EMAIL = "/auth/change-email"
  static CHANGE_PASSWORD = "/auth/change-password"
  static VERIFY_EMAIL = "/auth/resend-email-verification"
  /**
   * @typedef {Object} UserProfileResponse
   * @property {number} ID - Unique identifier for the record.
   * @property {?string} Access_Role_Pro - Professional access role (nullable).
   * @property {?string} Access_Role_Standard - Standard access role (nullable).
   * @property {?string} Access_States - Accessible states (nullable).
   * @property {?string} Account_Name_FM - FileMaker account name (nullable).
   * @property {string} Account_Name_Web - Web account name.
   * @property {?string} Address_Mailing_City - Mailing address city (nullable).
   * @property {?string} Address_Mailing_Country - Mailing address country (nullable).
   * @property {?string} Address_Mailing_Line_1 - Mailing address line 1 (nullable).
   * @property {?string} Address_Mailing_Line_2 - Mailing address line 2 (nullable).
   * @property {?string} Address_Mailing_Postal_Code - Mailing postal code (nullable).
   * @property {?string} Address_Mailing_State - Mailing state (nullable).
   * @property {?string} Address_Residence_City - Residence city (nullable).
   * @property {?string} Address_Residence_Country - Residence country (nullable).
   * @property {?string} Address_Residence_County_Code - Residence county code (nullable).
   * @property {?string} Address_Residence_County_Name - Residence county name (nullable).
   * @property {?string} Address_Residence_County_Precinct - Residence county precinct (nullable).
   * @property {?string} Address_Residence_Line_1 - Residence address line 1 (nullable).
   * @property {?string} Address_Residence_Line_2 - Residence address line 2 (nullable).
   * @property {?string} Address_Residence_Postal_Code - Residence postal code (nullable).
   * @property {?string} Address_Residence_State - Residence state.
   * @property {string} Email_Address - Email address.
   * @property {?boolean} Email_Address_Is_Verified - Email verification status (nullable).
   * @property {?string} Honorific - Honorific (nullable).
   * @property {string} ID_FM - Unique FileMaker ID.
   * @property {number} Is_Active - Active status (1 for active, 0 for inactive).
   * @property {string} Last_Login_DateTime_UTC - Last login timestamp (UTC).
   * @property {string} Name_First - First name.
   * @property {string} Name_Last - Last name.
   * @property {?string} Notes - Additional notes (nullable).
   * @property {string} Organization - Associated organization.
   * @property {string} Phone_Number - Contact phone number.
   * @property {?string} Photo - Profile photo (nullable).
   * @property {?string} Referred_By - Referral source (nullable).
   * @property {?string} Voter_Registration_Date - Voter registration date (nullable).
   * @property {string} Voter_Registration_Number - Voter registration number.
   * @property {string} z_Created_By - Creator of the record.
   * @property {string} z_Created_DateTime_UTC - Record creation timestamp (UTC).
   * @property {string} z_Modified_By - Last modifier of the record.
   * @property {string} z_Modified_DateTime_UTC - Last modification timestamp (UTC).
   */

  /**
   * Fetches the user profile.
   * @param {Object} data - Request parameters.
   * @returns {Promise<UserProfileResponse>} - The user profile data.
   * @throws {string} - Error message in case of failure.
   */
  static  getUserProfile(data) {
      return  get(this.GET_PROFILE, data)
  }


  /**
   * Updates the user profile.
   * @param {Object} data - Request parameters.
   * @returns {Promise<UserProfileResponse>} - The user profile data.
   * @throws {string} - Error message in case of failure.
   */
  static updateEmail(email) {
      return post(this.UPDATE_EMAIL, {email})   
  }

  static updatePassword(password,confirmPassword) {
      return post(this.CHANGE_PASSWORD, {password,confirmPassword})   
  }

  static verifyEmailAddress(){
      return post(this.VERIFY_EMAIL)
  }
}

export default ProfileAPI
