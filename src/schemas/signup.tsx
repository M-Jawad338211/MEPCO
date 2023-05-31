import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(3).max(25,"Name must be less than 30 character.").required("Name Cannot be Empty"),
  email: Yup.string().email().required("Email Cannot be Empty"),
  cnic:Yup.string().min(13).max(14,"Cnic must be 13 digits.").required("Cnic Cannot be Empty"),
  phoneNo:Yup.string().min(11,"Phone Number  must be 11 digits.").max(11,"Phone Number  must be 11 digits.").required("Phone Number Cannot be Empty"),
  userId: Yup.string().min(3).max(25,"Name must be less than 30 character.").required("UserId Cannot be Empty"),
  password: Yup.string().min(4,"Password should be minimum 4 digits").max(8,"Password should be maximum 8 digits").required("Password Cannot be Empty"),
});
