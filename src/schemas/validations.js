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
  email: Yup.array()
    .of(
      Yup.string().email("Invalid email format").required("Email is required")
    )
    .min(1, "At least one email is required")
    .max(5, "Maximum 5 emails are allowed")
    .test(
      "non-empty-emails",
      "At least one email is required",
      function (emails) {
        const validEmails = emails?.filter(
          (email) => email && email.trim() !== ""
        );
        return validEmails && validEmails.length > 0;
      }
    ),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  searchRadius: Yup.string().required("Search Radius is required"),
  status: Yup.boolean().required("Status is required"),
});
export const addQuestionValidation = Yup.object().shape({
  payload: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string()
          .required("Section title is required")
          .max(100, "Section title must be less than 100 characters"),
        order: Yup.number().required("Order is required"),
        questions: Yup.array()
          .of(
            Yup.object().shape({
              title: Yup.string()
                .required("Question title is required")
                .max(200, "Question must be less than 200 characters"),
              type: Yup.string().required("Question type is required"),
              // .oneOf(questionTypes, 'Invalid question type'),
              order: Yup.number().required("Order is required"),
              meta: Yup.object().shape({
                placeholder: Yup.string().max(
                  100,
                  "Placeholder must be less than 100 characters"
                ),
              }),
            })
          )
          .min(1, "At least one question is required"),
      })
    )
    .min(1, "At least one section is required"),
});
export const ContactFormSchema = Yup.object().shape({
  mvp: Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    // phone: Yup.number().required('Phone number is required'),
    phone: Yup.string()
      .matches(
        /^[0-9+\-()\s]{7,15}$/,
        // /^\(\d{3}\) \d{3}-\d{4}$/,
        "Enter a valid phone number"
      )
      .length(14, "Phone number must be 14 characters")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip code is required"),
  }),
});
