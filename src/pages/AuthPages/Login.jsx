import React from 'react';
import logo from "../../assets/images/logo.png"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F6FE]">
      <div className="w-full max-w-[500px] p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="" />
          </div>
          <p className="text-lg mt-2 font-medium">Welcome Back</p>
          <p className="text-sm text-gray-500">Please enter your credentials to continue</p>
        </div>

        <form className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="john.doe@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
              />
              <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400">
                👁️
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <a href="javascript:void(0)" className="text-[#00AEEF] hover:underline" onClick={() => navigate("/admin/forgot-password")}>Forgot Password?</a>
          </div>

          <button
            type="submit"
            onClick={() => navigate("/admin/dashboard")}
            className="w-full py-2 bg-[#00AEEF] text-white rounded hover:bg-[#0090c7] transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <p>🔘 Need help? <a href="#" className="text-[#00AEEF] hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
