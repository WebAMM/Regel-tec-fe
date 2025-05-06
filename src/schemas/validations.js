import * as Yup from "yup";

export const forgetPasswordValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export const changePasswordValidation = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
export const addStudyCenterValidation = Yup.object({
  name: Yup.string().required("Study Center Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  searchRadius: Yup.string().required("Search Radius is required"),
  status: Yup.boolean().required("Status is required"),
});
