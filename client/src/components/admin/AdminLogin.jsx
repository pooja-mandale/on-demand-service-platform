import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useLoginAdminMutation } from '../../redux/apis/adminApi';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock, FaSignInAlt, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loginAdmin, { isSuccess, isError, isLoading, error }] = useLoginAdminMutation();
    const [showPassword, setShowPassword] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required("Enter email").email("Invalid email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: (values, { resetForm }) => {
            loginAdmin(values);
            resetForm();
        }
    });

    const inputClasses = (key) =>
        clsx(
            "w-full pl-11 py-3 bg-slate-900/40 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-semibold text-white placeholder-slate-500",
            key === "password" ? "pr-12" : "pr-4",
            {
                "border-emerald-500 focus:ring-emerald-500/10 focus:border-emerald-500": formik.touched[key] && !formik.errors[key],
                "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500": formik.touched[key] && formik.errors[key],
                "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/10": !formik.touched[key] || (!formik.errors[key] && !formik.touched[key])
            }
        );

    useEffect(() => {
        if (isSuccess) {
            toast.success("Welcome back, Admin!");
            navigate("/admin/admin-dashboard");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError && error) {
            toast.error(error?.data?.message || "Admin login failed!");
        }
    }, [isError, error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl shadow-slate-900/50 animate-scale-in relative overflow-hidden">
                {/* Accent top border bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500"></div>

                <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 mb-3 border border-indigo-500/20">
                        <FaShieldAlt className="text-xs" /> Admin Portal
                    </span>
                    <h2 className="text-3xl font-display font-black text-white leading-tight">Admin Login</h2>
                    <p className="mt-1.5 text-sm text-slate-400 font-medium">Access the administrative command center.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-5">
                        {/* Email address */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-1.5">Email Address</label>
                            <div className="relative flex items-center">
                                <FaEnvelope className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    className={inputClasses("email")}
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    id="email"
                                    placeholder="admin@company.com"
                                    required
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="flex justify-between items-center mb-1.5">
                                <label htmlFor="password" className="block text-sm font-bold text-slate-300">Password</label>
                                <Link to="/admin-forgot-password" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                <FaLock className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("password")}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="••••••••"
                                    required
                                    className={inputClasses("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.password}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-950/50 hover:shadow-indigo-500/20 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <ClipLoader size={20} color="white" />
                        ) : (
                            <>
                                <FaSignInAlt className="text-base" />
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-slate-400 font-medium">
                        Need back-office credentials? Contact IT support.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
