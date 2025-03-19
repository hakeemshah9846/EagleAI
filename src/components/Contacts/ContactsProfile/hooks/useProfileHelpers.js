import * as Yup from "yup";
import { useFormik } from "formik";
import ProfileAPI from "../../../../store/auth/profile/api";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../../../store/actions";

const passwordValidation = Yup.string() 
  .min(8, "Password must be at least 8 characters")
  .max(50, "Password must be at most 50 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  )
  .required("Password is required");

// const confirmPasswordValidation = Yup.string()
//   .oneOf([Yup.ref("password"), null], "Passwords must match")
//   .required("Confirm Password is required");

const useProfileHelpers = (showFailureToast, showSuccessToast) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { 
      password: "", 
      confirmPassword: "" 
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: passwordValidation,
      // confirmPassword: confirmPasswordValidation,
    }),
    validate: async values => {
      const errors = {}
      try {
        await passwordValidation.validate(values.password)
      } catch (err) {
        errors.password = err.message
      }
      // try {
      //   await passwordValidation.validate(values.confirmPassword)
      // } catch (err) {
      //   errors.confirmPassword = err.message
      // }
      return errors
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        dispatch(toggleLoading());
        const response = await ProfileAPI.updatePassword(values.password,values.password);

        if (response?.status >= 200 && response?.status <= 299) {
          showSuccessToast("Password updated successfully.");
        }
      } catch (error) {
        showFailureToast("Failed to update password. Try again.");
        console.error("Error updating profile:", error);
      } finally {
        dispatch(toggleLoading(false));
        setSubmitting(false);
      }
      resetForm();
    },
  });

  return { formik };
};

export default useProfileHelpers;
