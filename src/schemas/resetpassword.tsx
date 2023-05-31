import * as Yup from "yup";

export const resetpasswordSchema = Yup.object({
  password: Yup.string().min(4,"Password should be minimum 4 digits").max(8,"Password should be maximum 8 digits").required("Password Cannot be Empty"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'),
  //  null
  ], 'Passwords must match').required("Confirm password doesn't matches the password."),
});
