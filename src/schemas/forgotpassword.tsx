import * as Yup from "yup";

export const forgotpasswordSchema = Yup.object({
  cnic: Yup.string().min(13).max(14,"Cnic must be 13 digits.").required("Cnic Cannot be Empty"),
 
});