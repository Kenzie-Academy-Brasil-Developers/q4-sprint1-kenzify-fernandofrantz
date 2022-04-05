import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string("Invalid username").required("name is a required field"),
  password: yup
    .string("Invalid password")
    .required("password is a required field"),
});
