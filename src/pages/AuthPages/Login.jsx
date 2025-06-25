import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { loginValidation } from "../../schemas/validations";
import { useLoginMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/authSlice";
import Loader from "../../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const initialValues = {
    email: localStorage.getItem("rememberedEmail") || "",
    password: localStorage.getItem("rememberedPassword") || "",
    rememberMe: localStorage.getItem("rememberedEmail") ? true : false,
  };

  const handleSubmit = async (values) => {
    console.log(values, "values");
    try {
      const response = await login(values).unwrap();
      dispatch(updateUser(response));
      console.log("Login successful:", response);
      toast.success("Login successful!");
      if (values.rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
        localStorage.setItem("rememberedPassword", values.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error?.data?.message || "Login failed! Please check your credentials."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="Company Logo" />
          </div>
          <p className="text-lg mt-2 font-medium">Welcome Back</p>
          <p className="text-sm text-gray-500">
            Please enter your credentials to continue
          </p>
        </div>

        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={loginValidation}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="john.doe@company.com"
                  className={`w-full px-3 py-2 border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 border ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10`}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "🔒" : "👁️"}
                  </span>
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="form-checkbox"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-[#00AEEF] hover:underline"
                  onClick={() => navigate("/admin/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#00AEEF] text-white rounded hover:[#0090c7] transition flex justify-center items-center cursor-pointer"
              >
                {isLoading ? <Loader /> : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {/* <div className="mt-6 text-sm text-gray-600">
          <p className="flex items-center justify-center gap-1">
            <span>Need help?</span>
            <button type="button" className="text-[#00AEEF] hover:underline">
              Contact Support
            </button>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
