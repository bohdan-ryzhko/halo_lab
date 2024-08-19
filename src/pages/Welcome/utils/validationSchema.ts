import * as Yup from "yup";
import { numbersRegex } from "../../../constants";

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).max(10).required(),
  complexity: Yup.string()
    .matches(numbersRegex, "Complexity must be a number between 1 and 10")
    .required(),
});
