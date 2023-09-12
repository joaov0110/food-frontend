import * as yup from "yup";

export const addressSchema = {
  postalCode: yup.string().min(8).max(8).required("Field required"),
  street: yup.string().min(5).max(30).required("Field required"),
  street_number: yup.string().min(1).max(3).required("Field required"),
  district: yup.string().min(2).max(20).required("Field required"),
  city: yup.string().min(2).max(10).required("Field required"),
  UF: yup.string().min(2).max(2).required("Field required"),
};
