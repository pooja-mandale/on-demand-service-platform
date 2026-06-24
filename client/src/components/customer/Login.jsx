import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLoginCustomerMutation } from '../../redux/apis/customerApi';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const Login = () => {
    const navigate = useNavigate();
    const [loginCustomer, { isSuccess, isError, isLoading, error }] = useLoginCustomerMutation();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required("Required").email("Invalid email"),
            password: yup.string().required("Required"),
        }),
        onSubmit: (values) => {
            loginCustomer(values);
        }
    });

    const inputClasses = (key) =>
        clsx(
            "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all outline-none",
            "focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            {
                "border-rose-400": formik.touched[key] && formik.errors[key],
            }
        );

    useEffect(() => {
        if (isSuccess) {
            toast.success("Welcome back!");
            navigate("/profile");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError) {
            const message = error?.data?.message || error?.message || "Invalid credentials. Please try again.";
            toast.error(message);
        }
    }, [isError, error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100/50 p-4">
            <div className="w-full max-w-[400px] bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Sign in</h2>
                    <p className="text-sm text-slate-500 mt-1">Welcome back, please enter your details.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Email</label>
                        <div className="relative flex items-center">
                            <FaEnvelope className="absolute left-3 text-slate-400 text-xs" />
                            <input className={inputClasses("email")} {...formik.getFieldProps("email")} placeholder="name@company.com" />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</label>
                            <Link to="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Forgot?</Link>
                        </div>
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
                        {isLoading ? <ClipLoader size={16} color="white" /> : <><FaSignInAlt /> Sign In</>}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account? <Link to="/register" className="font-semibold text-indigo-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;