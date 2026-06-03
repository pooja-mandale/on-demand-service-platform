import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useAddAgencyProffessionalMutation } from "../../redux/apis/agencyApi";
import { 
    FaUserPlus, 
    FaUser, 
    FaEnvelope, 
    FaPhone, 
    FaMapMarkerAlt, 
    FaList, 
    FaAward, 
    FaRupeeSign, 
    FaImage, 
    FaArrowRight 
} from "react-icons/fa";

const Add_agencyProfessional = () => {
    const [preview, setPreview] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [addAgencyProfessional, { isSuccess, isLoading }] = useAddAgencyProffessionalMutation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "agency_default_password_123", // Set a default since it's added by agency
            phone: "",
            address: "",
            categories: "plumber",
            experience: "",
            price: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Name is required"),
            email: yup
                .string()
                .email("Enter a valid email")
                .required("Email is required"),
            phone: yup
                .string()
                .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
                .required("Phone number is required"),
            address: yup.string().required("Service address is required"),
            categories: yup.string().required("Category is required"),
            experience: yup
                .number()
                .min(0, "Experience cannot be negative")
                .required("Experience is required"),
            price: yup
                .number()
                .min(0, "Hourly rate cannot be negative")
                .required("Price rate is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!selectedImage) {
                toast.error("Please upload a profile image");
                return;
            }
            
            const formData = new FormData();
            formData.append("image", selectedImage);
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });

            try {
                await addAgencyProfessional(formData).unwrap();
                resetForm();
            } catch (err) {
                toast.error(err?.data?.message || "Registration failed");
            }
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Professional registered successfully!");
            navigate("/agency/professionals");
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
            "w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border focus:border-emerald-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700",
            formik.touched[key] && formik.errors[key] ? "border-rose-350" : "border-slate-100"
        );

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Add Associate Professional</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Register a new specialist to assign customer jobs to.</p>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaUser className="text-slate-300" /> Full Name
                            </label>
                            <input
                                {...formik.getFieldProps("name")}
                                type="text"
                                id="name"
                                className={inputClasses("name")}
                                placeholder="E.g. Jane Doe"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formik.errors.name}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaEnvelope className="text-slate-300" /> Email Address
                            </label>
                            <input
                                {...formik.getFieldProps("email")}
                                type="email"
                                id="email"
                                className={inputClasses("email")}
                                placeholder="associate@agency.com"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formik.errors.email}</span>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaPhone className="text-slate-300" /> Phone Number
                            </label>
                            <input
                                {...formik.getFieldProps("phone")}
                                type="text"
                                id="phone"
                                className={inputClasses("phone")}
                                placeholder="10-digit mobile number"
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formik.errors.phone}</span>
                            )}
                        </div>

                        {/* Categories */}
                        <div className="space-y-1.5">
                            <label htmlFor="categories" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaList className="text-slate-300" /> Service Category
                            </label>
                            <select
                                id="categories"
                                {...formik.getFieldProps("categories")}
                                className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700"
                            >
                                <option value="plumber">Plumber</option>
                                <option value="electrician">Electrician</option>
                                <option value="cleaner">Cleaner</option>
                            </select>
                            {formik.touched.categories && formik.errors.categories && (
                                <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formik.errors.categories}</span>
                            )}
                        </div>

                        {/* Experience */}
                        <div className="space-y-1.5">
                            <label htmlFor="experience" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaAward className="text-slate-300" /> Experience (in years)
                            </label>
                            <input
                                {...formik.getFieldProps("experience")}
                                type="number"
                                id="experience"
                                className={inputClasses("experience")}
                                placeholder="E.g. 5"
                            />
                            {formik.touched.experience && formik.errors.experience && (
                                <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formik.errors.experience}</span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="space-y-1.5">
                            <label htmlFor="price" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaRupeeSign className="text-slate-300" /> Hourly Rate (₹)
                            </label>
                            <input
                                {...formik.getFieldProps("price")}
                                type="number"
                                id="price"
                                className={inputClasses("price")}
                                placeholder="Hourly pricing rate"
                            />
                            {formik.touched.price && formik.errors.price && (
                                <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formik.errors.price}</span>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                        <label htmlFor="address" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-slate-300" /> Full Address
                        </label>
                        <input
                            {...formik.getFieldProps("address")}
                            type="text"
                            id="address"
                            className={inputClasses("address")}
                            placeholder="Street, City, State, ZIP code"
                        />
                        {formik.touched.address && formik.errors.address && (
                            <span className="text-rose-500 text-[10px] font-bold block mt-0.5">{formik.errors.address}</span>
                        )}
                    </div>

                    {/* Image Upload Block */}
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avatar Profile Image</span>
                        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm shrink-0 flex items-center justify-center overflow-hidden">
                                {preview ? (
                                    <img src={preview} alt="Upload Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <FaImage className="text-slate-300 text-lg" />
                                )}
                            </div>
                            <div className="flex-grow space-y-1">
                                <label htmlFor="image" className="cursor-pointer inline-flex items-center gap-2 py-2 px-3 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600 shadow-sm transition-all">
                                    Choose Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                                <p className="text-[9px] text-slate-400 font-medium">JPEG, PNG, or WebP. Max 5MB.</p>
                            </div>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={clsx(
                            "w-full py-4 text-white font-bold text-xs rounded-xl shadow-lg transition duration-200 flex items-center justify-center gap-2",
                            {
                                "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/15": !isLoading,
                                "bg-emerald-400 cursor-not-allowed": isLoading,
                            }
                        )}
                    >
                        {isLoading ? (
                            <span>Registering...</span>
                        ) : (
                            <>
                                <FaUserPlus className="text-sm" />
                                <span>Register Associate</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Add_agencyProfessional;
