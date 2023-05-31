import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email Cannot be Empty"),
  cnic:Yup.string().min(13).max(14,"Cnic must be 13 digits.").required("Cnic Cannot be Empty"),
  phoneNo:Yup.string().min(11,"Phone Number  must be 11 digits.").max(11,"Phone Number  must be 11 digits.").required("Phone Number Cannot be Empty"),
  password: Yup.string().min(4,"Password should be minimum 4 digits").max(8,"Password should be maximum 8 digits").required("Password Cannot be Empty"),
});
