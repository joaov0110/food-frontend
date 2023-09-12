import * as yup from "yup";

import { addressSchema } from "./addressSchema";

const profileSchema = yup.object({
  name: yup.string().min(5).max(25).required("Field is required"),
  email: yup.string().min(10).max(50).email().required("Field is required"),
  document: yup.string().min(14).max(14).required("Field is required"),
  accountant_name: yup.string().min(5).max(20).required("Field is required"),
  accountant_email: yup
    .string()
    .min(5)
    .max(20)
    .email()
    .required("Field is required"),
  accountant_phone: yup.string().min(13).max(13).required("Field is required"),
  image_url: yup.string().default(null).nullable(),
  bgImage_url: yup.string().default(null).nullable(),
  ...addressSchema,
});

export default profileSchema;
