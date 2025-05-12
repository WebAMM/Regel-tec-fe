import React from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { forgetPasswordValidation, } from "../../schemas/validations";
import { useForgetPasswordMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgetPassword] = useForgetPasswordMutation()


  const initialValues = {
    email: "",
  };



  const handleSubmit = async (values) => {

    try {
      await forgetPassword(values).unwrap()
      toast.success("Password reset link sent to your email!")
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.data?.message || "Login failed! Please check your credentials.")

    }
    // console.log(values, "values");
    // navigate("/admin/change-password")
    // Simulate API call

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="Company Logo" />
          </div>
          <p className="text-lg mt-2 font-medium">Forgot Password</p>
          <p className="text-sm text-gray-500">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={forgetPasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="john.doe@company.com"
                  className={`w-full px-3 py-2 border ${errors.email && touched.email ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">{errors.email}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-[#00AEEF] text-white rounded hover:bg-[#0090c7] transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <Loader>

                  </Loader>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </Form>
          )}
        </Formik>


        <button
          type="button"
          onClick={() => navigate("/admin/login")}
          className="mt-6 block mx-auto text-sm text-gray-600 hover:text-[#00AEEF]"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;