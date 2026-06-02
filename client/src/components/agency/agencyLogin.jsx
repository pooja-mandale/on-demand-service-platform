import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useLoginAgencyMutation } from '../../redux/apis/agencyApi';
import { FaEnvelope, FaLock, FaSignInAlt, FaBriefcase, FaEye, FaEyeSlash } from 'react-icons/fa';

const AgencyLogin = () => {
    const [loginAgency, { isSuccess, isError, isLoading, error }] = useLoginAgencyMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email format").required("Enter email"),
            password: yup.string().required("Enter password"),
        }),
        onSubmit: (values, { resetForm }) => {
            loginAgency(values);
            resetForm();
        },
    });

    const inputClasses = (key) =>
        clsx(
            "w-full pl-11 py-3 bg-slate-900/40 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-semibold text-white placeholder-slate-500",
            key === "password" ? "pr-12" : "pr-4",
            {
                "border-emerald-500 focus:ring-emerald-500/10 focus:border-emerald-500": formik.touched[key] && !formik.errors[key],
                "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500": formik.touched[key] && formik.errors[key],
                "border-slate-700 focus:border-teal-500 focus:ring-teal-500/10": !formik.touched[key] || (!formik.errors[key] && !formik.touched[key])
            }
        );

    useEffect(() => {
        if (isSuccess) {
            toast.success("Agency login successful!");
            navigate("/agency/agency-dashboard");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError && error) {
            toast.error(error?.data?.message || "Agency login failed!");
        }
    }, [isError, error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl shadow-slate-900/50 animate-scale-in relative overflow-hidden">
                {/* Accent top border bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>

                <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 mb-3 border border-teal-500/20">
                        <FaBriefcase className="text-xs" /> Agency Account
                    </span>
                    <h2 className="text-3xl font-display font-black text-white leading-tight">Agency Login</h2>
                    <p className="mt-1.5 text-sm text-slate-400 font-medium">Sign in to manage your professional services.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-5">
                        {/* Email field */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-1.5">Email Address</label>
                            <div className="relative flex items-center">
                                <FaEnvelope className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    id="email"
                                    className={inputClasses("email")}
                                    placeholder="agency@company.com"
                                    required
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password field */}
                        <div className="relative">
                            <div className="flex justify-between items-center mb-1.5">
                                <label htmlFor="password" className="block text-sm font-bold text-slate-300">Password</label>
                                <Link to="/agency-forgot-password" className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                <FaLock className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("password")}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className={inputClasses("password")}
                                    placeholder="••••••••"
                                    required
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
                        className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-slate-950/50 hover:shadow-teal-500/20 text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        Don't have an agency account?{' '}
                        <Link to="/agency/register" className="font-bold text-teal-400 hover:text-teal-300 transition-colors">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AgencyLogin;
