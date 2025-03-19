export * from "./layout/actions"

// Authentication module
export * from "./auth/register/actions"
export * from "./auth/login/actions"
export * from "./auth/forgetpwd/actions"
export * from "./auth/profile/actions"
export * from "./auth/resetpwd/action";
export const getDeceasedRecords = () => {
  return {
    type: "GET_DECEASED_RECORDS",
  };
};
