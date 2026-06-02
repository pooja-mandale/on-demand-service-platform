import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useRegisterProfessionalMutation } from "../../redux/apis/professionalApi";
import { ClipLoader } from 'react-spinners';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaList, FaAward, FaDollarSign, FaCamera, FaUserPlus, FaSignInAlt, FaEye, FaEyeSlash, FaTools } from 'react-icons/fa';

const ProfessionalRegister = () => {
    const [preview, setPreview] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [registerProfessional, { isSuccess, isError, isLoading, error }] = useRegisterProfessionalMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            categories: "",
            experience: "",
            price: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter your name"),
            email: yup
                .string()
                .email("Enter a valid email")
                .required("Enter your email"),
            categories: yup
                .string()
                .required("Select a category"),
            password: yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .required("Enter your password"),
            phone: yup
                .string()
                .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
                .required("Enter your phone number"),
            address: yup.string().required("Enter your address"),
            experience: yup
                .number()
                .min(0, "Experience must be a non-negative number")
                .required("Enter your experience"),
            price: yup
                .number()
                .min(0, "Price must be a positive number")
                .required("Enter your price"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("image", selectedImage);
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, values[key]);
            });

            try {
                await registerProfessional(formData);
                resetForm();
            } catch (err) {
                console.error("Registration error:", err);
            }
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Professional registered successfully!");
            navigate("/professional-login");
        }

        if (isError) {
            toast.error(error?.data?.message || "Registration failed");
        }
    }, [isSuccess, isError, error, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const inputClasses = (key) =>
        clsx(
            "w-full pl-11 py-2.5 bg-slate-900/40 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 font-semibold text-white placeholder-slate-500",
            key === "password" ? "pr-11" : "pr-4",
            {
                "border-emerald-500 focus:ring-emerald-500/10 focus:border-emerald-500": formik.touched[key] && !formik.errors[key],
                "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500": formik.touched[key] && formik.errors[key],
                "border-slate-700 focus:border-amber-500 focus:ring-amber-500/10": !formik.touched[key] || (!formik.errors[key] && !formik.touched[key])
            }
        );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow"></div>
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

            <div className="max-w-2xl w-full space-y-8 bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl shadow-slate-900/50 animate-scale-in relative overflow-hidden">
                {/* Accent top border bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-orange-500"></div>

                <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 mb-3 border border-amber-500/20">
                        <FaTools className="text-xs" /> Join as Professional
                    </span>
                    <h2 className="text-3xl font-display font-black text-white leading-tight">Professional Registration</h2>
                    <p className="mt-1.5 text-sm text-slate-400 font-medium">Create your expert profile and start receiving jobs.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="relative">
                            <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-1.5">Full Name</label>
                            <div className="relative flex items-center">
                                <FaUser className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("name")}
                                    type="text"
                                    id="name"
                                    className={inputClasses("name")}
                                    placeholder="John Doe"
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
                                    placeholder="expert@company.com"
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
                                    className="absolute right-4 text-slate-505 hover:text-slate-300 transition-colors focus:outline-none"
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
                                    placeholder="10-digit phone"
                                    required
                                />
                            </div>
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.phone}</p>
                            )}
                        </div>

                        {/* Categories */}
                        <div className="relative">
                            <label htmlFor="categories" className="block text-sm font-bold text-slate-300 mb-1.5">Categories</label>
                            <div className="relative flex items-center">
                                <FaList className="absolute left-4 text-slate-500 text-base" />
                                <select
                                    id="categories"
                                    {...formik.getFieldProps("categories")}
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-900/40 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:border-amber-500 focus:ring-amber-500/10 transition-all duration-300 font-semibold text-white placeholder-slate-500"
                                    required
                                >
                                    <option value="" className="text-slate-800">Select Category</option>
                                    <option value="plumber" className="text-slate-800">Plumber</option>
                                    <option value="electrician" className="text-slate-800">Electrician</option>
                                    <option value="cleaner" className="text-slate-800">Cleaner</option>
                                </select>
                            </div>
                            {formik.touched.categories && formik.errors.categories && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.categories}</p>
                            )}
                        </div>

                        {/* Experience */}
                        <div className="relative">
                            <label htmlFor="experience" className="block text-sm font-bold text-slate-300 mb-1.5">Experience (in years)</label>
                            <div className="relative flex items-center">
                                <FaAward className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("experience")}
                                    type="number"
                                    id="experience"
                                    className={inputClasses("experience")}
                                    placeholder="Experience years"
                                    required
                                />
                            </div>
                            {formik.touched.experience && formik.errors.experience && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.experience}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="relative">
                            <label htmlFor="price" className="block text-sm font-bold text-slate-300 mb-1.5">Price (per hour in $)</label>
                            <div className="relative flex items-center">
                                <FaDollarSign className="absolute left-4 text-slate-500 text-base" />
                                <input
                                    {...formik.getFieldProps("price")}
                                    type="number"
                                    id="price"
                                    className={inputClasses("price")}
                                    placeholder="Price rate"
                                    required
                                />
                            </div>
                            {formik.touched.price && formik.errors.price && (
                                <p className="mt-1.5 text-xs text-rose-400 font-medium">{formik.errors.price}</p>
                            )}
                        </div>

                        {/* Profile Image */}
                        <div className="relative md:col-span-2">
                            <label className="block text-sm font-bold text-slate-300 mb-1.5">Profile Image</label>
                            <div className="flex items-center gap-4 bg-slate-900/40 p-4 border border-slate-700 border-dashed rounded-2xl">
                                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <FaCamera className="text-slate-500 text-lg" />
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="image" className="cursor-pointer inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/25 transition-all">
                                        Choose Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required
                                    />
                                    <p className="mt-1 text-2xs text-slate-400 font-medium">JPEG, PNG, or WebP. Max 5MB.</p>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="relative md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-bold text-slate-300 mb-1.5">Service Address</label>
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
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-slate-950/50 hover:shadow-amber-500/20 text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <ClipLoader size={20} color="white" />
                        ) : (
                            <>
                                <FaUserPlus className="text-base" />
                                <span>Register Professional</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-slate-400 font-medium">
                        Already have a professional account?{" "}
                        <Link to="/professional-login" className="font-bold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1">
                            <FaSignInAlt className="text-xs" /> Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalRegister;

