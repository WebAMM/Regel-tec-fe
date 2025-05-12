import React, { useState } from 'react';
import logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { changePasswordValidation } from '../../schemas/validations';
import { useResetTokenQuery, useUpdatePasswordMutation } from '../../api/apiSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const pathname = useLocation()
  // console.log(pathname.search.split('=')[1], "pathname")
  const token = pathname.search.split('=')[1]
  const { data: tokenData, isLoading, isError } = useResetTokenQuery(token, {
    refetchOnMountOrArgChange: true,
  })
  const [updatePassword] = useUpdatePasswordMutation()
  const initialValues = {
    token: tokenData?.data?.token,
    password: "",
    confirmPassword: ""
  };

  // Password validation schema

  const handleSubmit = async (values) => {
    try {
      const response = await updatePassword(values).unwrap()
      console.log("Password updated successfully:", response);
      toast.success("Password updated successfully!")
      navigate("/admin/login")

    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.data?.message || "Login failed! Please check your credentials.")

    }
  };
  console.log(tokenData, "tokenData")
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  if (isError) {
    return <div className="flex items-center justify-center min-h-screen">Something Went Wrong</div>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="Company Logo" />
          </div>
          <p className="text-lg mt-2 font-medium">Change Password</p>
          <p className="text-sm text-gray-500">Enter your new password</p>
        </div>


        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 border ${errors.password && touched.password ? "border-red-500" : "border-gray-300"
                      } rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10`}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🔒' : '👁️'}
                  </span>
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                )}
                <div className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters with uppercase, lowercase, number, and special character
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 border ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-gray-300"
                      } rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10`}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '🔒' : '👁️'}
                  </span>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#00AEEF] text-white rounded hover:bg-[#00AEEF] transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <Loader />
                ) : (
                  "Reset Password"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <button
          type="button"
          onClick={() => navigate("/admin/login")}
          className="mt-6 block mx-auto text-sm text-gray-600 hover:text-blue-500"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;