import * as Yup from "yup";

export const otpSchema = Yup.object({
  otp: Yup.number().required("Please enter your OTP"),
 
});
