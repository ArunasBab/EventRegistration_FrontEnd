import * as Yup from "yup";
import { passwordRegex } from "../../../EventRegistration_BackEnd/utils/regex.js";

const registerUserSchema = Yup.object().shape({
  name: Yup.string().min(2).max(30).required(),
  lastName: Yup.string().min(2).max(30).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).matches(passwordRegex).required(),
});

export default registerUserSchema;
