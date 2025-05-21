import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../../assets/images/logo.png";


const LandingPageLogin = ({ open, handleSubmit }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    if (!open) return null;
    return (
        <div className="fixed inset-0  bg-blue-50 z-[999] flex items-center justify-center">
            <div className=" rounded-xl  p-6 ">
                <div className="">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
                        <div className="mb-6">
                            <div className="flex justify-center mb-2">
                                <img src={logo} alt="Company Logo" />
                            </div>
                            <p className="text-lg mt-2 font-medium">Welcome</p>
                            <p className="text-sm text-gray-500">This Site is Under Construction</p>
                        </div>

                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        >
                            {() => (
                                <Form className="space-y-4 text-left">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="john.doe@company.com"
                                            className={`w-full px-3 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                        />

                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <div className="relative">
                                            <Field
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                className={`w-full px-3 py-2 border  rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10`}
                                            />
                                            <span
                                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? '🔒' : '👁️'}
                                            </span>
                                        </div>

                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 bg-[#00AEEF] text-white rounded hover:[#0090c7] transition"
                                    >

                                        Login
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LandingPageLogin;