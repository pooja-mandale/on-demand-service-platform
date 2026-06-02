import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useRegisterAgencyMutation } from "../../redux/apis/agencyApi";
import toast from "react-hot-toast";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaBriefcase, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaInfoCircle, FaUserPlus, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';

const AgencyRegister = () => {
    const navigate = useNavigate();
    const [agencyRegister, { isSuccess, isError, isLoading, error }] = useRegisterAgencyMutation();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            address: "",
            phone: "",
            description: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter name"),
            email: yup.string().email("Enter a valid email").required("Enter email"),
            password: yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .required("Enter password"),
            address: yup.string().required("Enter address"),
            phone: yup
                .string()
                .required("Enter phone"),
            description: yup.string().required("Enter description"),
        }),
        onSubmit: async (values, { resetForm }) => {
            agencyRegister(values);
            resetForm();
        },
    });

    const inputClasses = (key) =>
        clsx(
            "w-full pl-11 py-2.5 bg-slate-900/40 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-semibold text-white placeholder-slate-500",
            key === "password" ? "pr-11" : "pr-4",
            {
                "border-emerald-500 focus:ring-emerald-500/10 focus:border-emerald-500": formik.touched[key] && !formik.errors[key],
                "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500": formik.touched[key] && formik.errors[key],
                "border-slate-700 focus:border-teal-500 focus:ring-teal-500/10": !formik.touched[key] || (!formik.errors[key] && !formik.touched[key])
            }
        );

    useEffect(() => {
        if (isError && error) {
            toast.error(error?.data?.message || "Failed to register agency. Please try again.");
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Agency registered successfully!");
            navigate("/agency/login");
        }
    }, [isSuccess, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow"></div>
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-2xl w-full space-y-8 bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl shadow-slate-900/50 animate-scale-in relative overflow-hidden">
                {/* Accent top border bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>

                <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 mb-3 border border-teal-500/20">
                        <FaBriefcase className="text-xs" /> Register Agency
                    </span>
                    <h2 className="text-3xl font-display font-black text-white leading-tight">Create Agency Account</h2>
                    <p className="mt-1.5 text-sm text-slate-400 font-medium">Join us to scale your service provider business.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="relative">
                            <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-1.5">Agency Name</label>
                            <div className="relative flex items-center">
                                <FaBriefcase className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("name")}
                                    type="text"
                                    id="name"
                                    className={inputClasses("name")}
                                    placeholder="Agency Name"
                                    required
                                />
                            </div>
                            {formik.touched.name && formik.errors.name && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
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

                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-bold text-slate-300 mb-1.5">Password</label>
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

                        {/* Phone */}
                        <div className="relative">
                            <label htmlFor="phone" className="block text-sm font-bold text-slate-300 mb-1.5">Phone Number</label>
                            <div className="relative flex items-center">
                                <FaPhone className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("phone")}
                                    type="text"
                                    id="phone"
                                    className={inputClasses("phone")}
                                    placeholder="10-digit number"
                                    required
                                />
                            </div>
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.phone}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="relative md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-bold text-slate-300 mb-1.5">Business Address</label>
                            <div className="relative flex items-center">
                                <FaMapMarkerAlt className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("address")}
                                    type="text"
                                    id="address"
                                    className={inputClasses("address")}
                                    placeholder="Street, City, State, ZIP"
                                    required
                                />
                            </div>
                            {formik.touched.address && formik.errors.address && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.address}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="relative md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-bold text-slate-300 mb-1.5">Business Description</label>
                            <div className="relative flex items-start">
                                <FaInfoCircle className="absolute left-4 top-3.5 text-slate-500 text-base" />
                                <textarea
                                    {...formik.getFieldProps("description")}
                                    id="description"
                                    className={clsx(
                                        "w-full pl-11 pr-4 py-2.5 bg-slate-900/40 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-semibold text-white placeholder-slate-500 min-h-[100px]",
                                        {
                                            "border-emerald-500 focus:ring-emerald-500/10 focus:border-emerald-500": formik.touched.description && !formik.errors.description,
                                            "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500": formik.touched.description && formik.errors.description,
                                            "border-slate-700 focus:border-teal-500 focus:ring-teal-500/10": !formik.touched.description || (!formik.errors.description && !formik.touched.description)
                                        }
                                    )}
                                    placeholder="Tell us about the services you specialize in..."
                                    required
                                />
                            </div>
                            {formik.touched.description && formik.errors.description && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.description}</p>
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
                                <FaUserPlus className="text-base" />
                                <span>Register Agency</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-slate-400 font-medium">
                        Already have an agency account?{" "}
                        <Link to="/agency/login" className="font-bold text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1">
                            <FaSignInAlt className="text-xs" /> Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AgencyRegister;
