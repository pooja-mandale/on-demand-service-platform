import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRegisterCustomerMutation } from '../../redux/apis/customerApi';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const Register = () => {
    const navigate = useNavigate();
    const [customerRegister, { isSuccess, isError, isLoading, error }] = useRegisterCustomerMutation();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: yup.object({
            name: yup.string().required("Full name is required"),
            email: yup.string().required("Email is required").email("Invalid email format"),
            password: yup.string().required("Password is required").min(6, "Must be at least 6 characters"),
        }),
        onSubmit: (values) => {
            customerRegister(values);
        }
    });

    const inputClasses = (key) =>
        clsx(
            "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all outline-none",
            "focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            { "border-rose-400": formik.touched[key] && formik.errors[key] }
        );

    useEffect(() => {
        if (isSuccess) {
            toast.success("Registration Successful! Please Login.");
            navigate("/login");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError) {
            const message = error?.data?.message || error?.message || "Registration failed. Please try again.";
            toast.error(message);
        }
    }, [isError, error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100/50 p-4">
            <div className="w-full max-w-[400px] bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
                    <p className="text-sm text-slate-500 mt-1">Join us to access home services.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                        <div className="relative flex items-center">
                            <FaUser className="absolute left-3 text-slate-400 text-xs" />
                            <input className={inputClasses("name")} {...formik.getFieldProps("name")} placeholder="John Doe" />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                        <div className="relative flex items-center">
                            <FaEnvelope className="absolute left-3 text-slate-400 text-xs" />
                            <input className={inputClasses("email")} {...formik.getFieldProps("email")} placeholder="name@company.com" />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Password</label>
                        <div className="relative flex items-center">
                            <FaLock className="absolute left-3 text-slate-400 text-xs" />
                            <input className={inputClasses("password")} {...formik.getFieldProps("password")} type={showPassword ? "text" : "password"} placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-slate-400 hover:text-slate-600">
                                {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                            </button>
                        </div>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
                    >
                        {isLoading ? <ClipLoader size={16} color="white" /> : <><FaUserPlus /> Sign Up</>}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account? <Link to="/login" className="font-semibold text-indigo-600 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;