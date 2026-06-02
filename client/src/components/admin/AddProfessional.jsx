import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useAddProfessionalMutation } from "../../redux/apis/adminApi";
import { FiUser, FiMail, FiPhone, FiMapPin, FiAward, FiDollarSign, FiCamera, FiPlus } from 'react-icons/fi';
import Loader from "../../share/Loader";

const AddProfessional = () => {
    const [preview, setPreview] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [addProfessional, { isSuccess, isError, isLoading, error }] = useAddProfessionalMutation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            categories: "plumber",
            experience: "",
            price: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter the professional's name"),
            email: yup.string().email("Enter a valid email").required("Enter the email address"),
            phone: yup.string().required("Enter the phone number"),
            address: yup.string().required("Enter the address"),
            categories: yup.string().required("Select a category"),
            experience: yup.number().min(0, "Experience cannot be negative").required("Enter years of experience"),
            price: yup.number().min(0, "Price cannot be negative").required("Enter hourly rate"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!selectedImage) {
                toast.error("Please upload a profile image.");
                return;
            }
            const formData = new FormData();
            formData.append("image", selectedImage);
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });

            try {
                await addProfessional(formData);
                resetForm();
            } catch (err) {
                console.error("Registration error:", err);
            }
        },
    });

    // Handle success or error
    useEffect(() => {
        if (isSuccess) {
            toast.success("Professional registered successfully!");
            navigate("/admin/professional-page");
        }
    }, [isSuccess, navigate]);

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
            "w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm focus:outline-none focus:bg-white focus:ring-2 transition-all",
            formik.touched[key] && formik.errors[key]
                ? "border-red-400 focus:ring-red-500/20"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
        );

    if (isLoading) {
        return <Loader fullScreen={false} text="Registering new professional..." />;
    }

    return (
        <div className="max-w-2xl mx-auto py-6 px-4 animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Marketplace Mod</span>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">Add Professional</h1>
                <p className="text-slate-500 text-xs sm:text-sm">Register a new vetted service expert into the marketplace directory.</p>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-soft relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-300/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-300/10 rounded-full blur-2xl"></div>

                <form onSubmit={formik.handleSubmit} className="space-y-5 relative z-10">
                    
                    {/* File Upload / Avatar Preview */}
                    <div className="flex flex-col items-center sm:flex-row gap-5 mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-150 bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0 relative shadow-inner">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <FiUser className="text-3xl" />
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Profile Photo</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="image"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                <label 
                                    htmlFor="image" 
                                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-sm"
                                >
                                    <FiCamera className="text-sm" />
                                    <span>Upload Photo</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                            <div className="relative flex items-center mt-1.5">
                                <FiUser className="absolute left-3.5 text-slate-400 text-sm" />
                                <input
                                    {...formik.getFieldProps("name")}
                                    type="text"
                                    id="name"
                                    className={inputClasses("name")}
                                    placeholder="Jane Doe"
                                />
                            </div>
                            {formik.touched.name && formik.errors.name && (
                                <span className="text-red-500 text-2xs mt-1 block">{formik.errors.name}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                            <div className="relative flex items-center mt-1.5">
                                <FiMail className="absolute left-3.5 text-slate-400 text-sm" />
                                <input
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    id="email"
                                    className={inputClasses("email")}
                                    placeholder="jane.doe@company.com"
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-red-500 text-2xs mt-1 block">{formik.errors.email}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                            <div className="relative flex items-center mt-1.5">
                                <FiPhone className="absolute left-3.5 text-slate-400 text-sm" />
                                <input
                                    {...formik.getFieldProps("phone")}
                                    type="text"
                                    id="phone"
                                    className={inputClasses("phone")}
                                    placeholder="+91 9876543210"
                                />
                            </div>
                            {formik.touched.phone && formik.errors.phone && (
                                <span className="text-red-500 text-2xs mt-1 block">{formik.errors.phone}</span>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="categories" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Service Category</label>
                            <select
                                id="categories"
                                {...formik.getFieldProps("categories")}
                                className="w-full mt-1.5 p-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-semibold text-slate-700"
                            >
                                <option value="plumber">Plumber</option>
                                <option value="electrician">Electrician</option>
                                <option value="cleaner">Cleaner</option>
                            </select>
                            {formik.touched.categories && formik.errors.categories && (
                                <span className="text-red-500 text-2xs mt-1 block">{formik.errors.categories}</span>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Address Location</label>
                        <div className="relative flex items-center mt-1.5">
                            <FiMapPin className="absolute left-3.5 text-slate-400 text-sm" />
                            <input
                                {...formik.getFieldProps("address")}
                                type="text"
                                id="address"
                                className={inputClasses("address")}
                                placeholder="123 Luxury Avenue, City, State"
                            />
                        </div>
                        {formik.touched.address && formik.errors.address && (
                            <span className="text-red-500 text-2xs mt-1 block">{formik.errors.address}</span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Experience */}
                        <div>
                            <label htmlFor="experience" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Experience (Years)</label>
                            <div className="relative flex items-center mt-1.5">
                                <FiAward className="absolute left-3.5 text-slate-400 text-sm" />
                                <input
                                    {...formik.getFieldProps("experience")}
                                    type="number"
                                    id="experience"
                                    className={inputClasses("experience")}
                                    placeholder="5"
                                />
                            </div>
                            {formik.touched.experience && formik.errors.experience && (
                                <span className="text-red-500 text-2xs mt-1 block">{formik.errors.experience}</span>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Hourly Rate (₹)</label>
                            <div className="relative flex items-center mt-1.5">
                                <FiDollarSign className="absolute left-3.5 text-slate-400 text-sm" />
                                <input
                                    {...formik.getFieldProps("price")}
                                    type="number"
                                    id="price"
                                    className={inputClasses("price")}
                                    placeholder="499"
                                />
                            </div>
                            {formik.touched.price && formik.errors.price && (
                                <span className="text-red-500 text-2xs mt-1 block">{formik.errors.price}</span>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold rounded-2xl transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:translate-y-0 transform hover:-translate-y-0.5 text-sm cursor-pointer"
                        >
                            <FiPlus className="text-base" />
                            <span>Add Professional</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProfessional;
