import React from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6F6FE]">
      <div className="w-full max-w-[500px] p-8 bg-white rounded-lg shadow-md text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="" />
          </div>
          <p className="text-lg mt-2 font-medium">Forgot Password</p>
          <p className="text-sm text-gray-500">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="john.doe@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            onClick={() => navigate("/admin/change-password")}
            className="w-full py-2 bg-[#00AEEF] text-white rounded hover:bg-[#0090c7] transition"
          >
            Send Link
          </button>
        </form>

        <a href="javascript:void(0)" className="mt-6 block text-sm text-gray-600" onClick={() => navigate("/admin/login")}>Back To Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
