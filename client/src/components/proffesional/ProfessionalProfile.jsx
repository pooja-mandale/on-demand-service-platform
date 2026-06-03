import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    useGetProfessionalProfileQuery,
    useLogOutProfessionalMutation,
    useUpdateProfessionalProfileMutation,
} from "../../redux/apis/professionalApi";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../share/Loader";
import { 
    FaUser, 
    FaEnvelope, 
    FaPhone, 
    FaMapMarkerAlt, 
    FaBriefcase, 
    FaRupeeSign, 
    FaEdit, 
    FaSignOutAlt, 
    FaAward, 
    FaImage, 
    FaTimes, 
    FaCheckCircle 
} from "react-icons/fa";

const ProfessionalProfile = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [preview, setPreview] = useState(null);
    const [logOutProfessional, { isSuccess: logOutSuccess }] = useLogOutProfessionalMutation();
    const [editProfile, { isSuccess, isLoading: editProfileLoading }] = useUpdateProfessionalProfileMutation();
    const { data: professionalData, isLoading, isError, refetch } = useGetProfessionalProfileQuery();

    const formik = useFormik({
        initialValues: {
            name: selectedProfessional?.name || "",
            email: selectedProfessional?.email || "",
            phone: selectedProfessional?.phone || "",
            address: selectedProfessional?.address || "",
            categories: selectedProfessional?.categories || "",
            experience: selectedProfessional?.experience || 0,
            image: selectedProfessional?.image || "",
            price: selectedProfessional?.price || 0,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
            address: Yup.string(),
            categories: Yup.string().required("Category is required"),
            experience: Yup.number().min(0, "Experience cannot be negative").required("Experience is required"),
            price: Yup.number().min(0, "Price cannot be negative").required("Price is required"),
        }),
        onSubmit: async (values) => {
            const updatedData = { ...values };
            if (preview) {
                // If preview is a blob URL from locally selected file, we use formik's image file object
                // In Formik, formik.values.image contains the File object from input[type=file]
            }
            try {
                const fd = new FormData();
                for (const key in updatedData) {
                    if (key === "image" && typeof updatedData[key] === "string" && !preview) {
                        // Skip if it's unchanged string URL
                        continue;
                    }
                    fd.append(key, updatedData[key]);
                }
                await editProfile({ fd, _id: selectedProfessional?._id }).unwrap();
                closeModal();
            } catch (error) {
                console.error("Error updating profile:", error);
                toast.error("Failed to update profile. Please try again.");
            }
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Profile Updated Successfully");
            refetch();
        }
    }, [isSuccess, refetch]);

    useEffect(() => {
        if (logOutSuccess) {
            navigate("/");
            toast.success("Logged out successfully");
        }
    }, [logOutSuccess, navigate]);

    const openModal = (professional) => {
        setSelectedProfessional(professional);
        setPreview(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProfessional(null);
        setPreview(null);
        setIsModalOpen(false);
    };

    if (isLoading) return <Loader text="Loading your profile..." />;
    if (isError) {
        return (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm my-12">
                <p className="text-lg font-bold text-red-500 mb-2">Error loading profile</p>
                <p className="text-slate-500 text-sm">Please try refreshing the page or logging in again.</p>
            </div>
        );
    }

    const categoryName = professionalData?.categories 
        ? professionalData.categories.charAt(0).toUpperCase() + professionalData.categories.slice(1) 
        : "Professional";

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight font-sans">Profile Settings</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Review your public details, rates, and active credentials.</p>
            </div>

            {/* Profile Detail Layout */}
            {professionalData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Left: Avatar Column */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center space-y-4">
                        <div className="relative group">
                            <img
                                src={professionalData?.image || "https://res.cloudinary.com/da5klmpqb/image/upload/v1721291355/download_w2o5rv.jpg"}
                                alt={professionalData?.name}
                                className="w-32 h-32 rounded-3xl object-cover border-2 border-indigo-50/80 shadow-md"
                            />
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border border-white text-[9px] shadow-sm" title="Active">
                                <FaCheckCircle />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-extrabold text-slate-800 leading-tight">{professionalData?.name}</h3>
                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100/50 uppercase tracking-wider mt-2">
                                {categoryName}
                            </span>
                        </div>

                        <div className="w-full h-px bg-slate-100 my-2" />

                        <div className="grid grid-cols-2 gap-4 w-full text-left">
                            <div className="bg-slate-50 border border-slate-100/40 p-3 rounded-2xl">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Experience</span>
                                <strong className="text-slate-700 text-xs font-black flex items-center gap-1 mt-0.5">
                                    <FaAward className="text-indigo-500" />
                                    {professionalData?.experience} Years
                                </strong>
                            </div>
                            <div className="bg-slate-50 border border-slate-100/40 p-3 rounded-2xl">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Hourly Rate</span>
                                <strong className="text-slate-700 text-xs font-black flex items-center gap-0.5 mt-0.5">
                                    <FaRupeeSign className="text-emerald-500" />
                                    {professionalData?.price}/hr
                                </strong>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full pt-2">
                            <button
                                onClick={() => openModal(professionalData)}
                                className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 font-bold text-xs rounded-xl shadow-md shadow-indigo-600/10 transition-all"
                            >
                                <FaEdit className="text-sm" />
                                Edit Account
                            </button>
                        </div>
                    </div>

                    {/* Right: Personal Details Column */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm md:col-span-2 space-y-6">
                        <h4 className="font-extrabold text-slate-800 text-sm border-b border-slate-100 pb-3">Personal & Contact Info</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <FaUser className="text-slate-300" /> Full Name
                                </span>
                                <p className="text-xs font-bold text-slate-700 bg-slate-50/50 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                                    {professionalData?.name || "N/A"}
                                </p>
                            </div>

                            {/* Email Address */}
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <FaEnvelope className="text-slate-300" /> Email Address
                                </span>
                                <p className="text-xs font-bold text-slate-700 bg-slate-50/50 border border-slate-100 px-3.5 py-2.5 rounded-xl truncate" title={professionalData?.email}>
                                    {professionalData?.email || "N/A"}
                                </p>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <FaPhone className="text-slate-300" /> Phone Number
                                </span>
                                <p className="text-xs font-bold text-slate-700 bg-slate-50/50 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                                    {professionalData?.phone || "N/A"}
                                </p>
                            </div>

                            {/* Category */}
                            <div className="space-y-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <FaBriefcase className="text-slate-300" /> Category Service
                                </span>
                                <p className="text-xs font-bold text-slate-700 bg-slate-50/50 border border-slate-100 px-3.5 py-2.5 rounded-xl capitalize">
                                    {professionalData?.categories || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Full Address */}
                        <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-slate-300" /> Service Location / Address
                            </span>
                            <p className="text-xs font-semibold text-slate-600 bg-slate-50/50 border border-slate-100 px-3.5 py-3 rounded-xl leading-relaxed">
                                {professionalData?.address || "No address provided."}
                            </p>
                        </div>
                    </div>

                </div>
            )}

            {/* Modal for Editing Profile */}
            <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
                {/* Backdrop overlay */}
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />

                {/* Modal Container */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                        
                        {/* Title Bar */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                            <Dialog.Title className="text-base font-black text-slate-800 tracking-tight">Edit Profile Details</Dialog.Title>
                            <button 
                                onClick={closeModal}
                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Scrollable Form */}
                        <form onSubmit={formik.handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-1">
                                    <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name && (
                                        <p className="text-rose-500 text-[10px] font-bold mt-0.5">{formik.errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <p className="text-rose-500 text-[10px] font-bold mt-0.5">{formik.errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-1">
                                    <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <p className="text-rose-500 text-[10px] font-bold mt-0.5">{formik.errors.phone}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div className="space-y-1">
                                    <label htmlFor="categories" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</label>
                                    <input
                                        id="categories"
                                        name="categories"
                                        type="text"
                                        className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.categories}
                                    />
                                    {formik.touched.categories && formik.errors.categories && (
                                        <p className="text-rose-500 text-[10px] font-bold mt-0.5">{formik.errors.categories}</p>
                                    )}
                                </div>

                                {/* Experience */}
                                <div className="space-y-1">
                                    <label htmlFor="experience" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience (Years)</label>
                                    <input
                                        id="experience"
                                        name="experience"
                                        type="number"
                                        className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.experience}
                                    />
                                    {formik.touched.experience && formik.errors.experience && (
                                        <p className="text-rose-500 text-[10px] font-bold mt-0.5">{formik.errors.experience}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="space-y-1">
                                    <label htmlFor="price" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hourly Price (₹)</label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.price}
                                    />
                                    {formik.touched.price && formik.errors.price && (
                                        <p className="text-rose-500 text-[10px] font-bold mt-0.5">{formik.errors.price}</p>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-1">
                                <label htmlFor="address" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location / Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows="2"
                                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all text-slate-700 resize-none"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <p className="text-rose-500 text-[10px] font-bold mt-0.5">{formik.errors.address}</p>
                                )}
                            </div>

                            {/* Image Upload Block */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avatar Profile Image</span>
                                <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                                    <img 
                                        src={preview || selectedProfessional?.image || "https://res.cloudinary.com/da5klmpqb/image/upload/v1721291355/download_w2o5rv.jpg"} 
                                        alt="Avatar Preview" 
                                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                                    />
                                    <div className="flex-1 space-y-1">
                                        <label className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-white border border-slate-100 hover:border-slate-200 rounded-lg cursor-pointer shadow-sm transition-all hover:bg-slate-50">
                                            <FaImage className="text-xs" />
                                            <span>Upload New</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setPreview(URL.createObjectURL(file));
                                                        formik.setFieldValue("image", file);
                                                    }
                                                }}
                                            />
                                        </label>
                                        <p className="text-[9px] text-slate-400 font-medium">JPEG, PNG, or WEBP up to 5MB.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Save Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2.5 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProfileLoading}
                                    className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl transition-all shadow-md shadow-indigo-600/10"
                                >
                                    {editProfileLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>

        </div>
    );
};

export default ProfessionalProfile;
