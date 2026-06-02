import { useSelector } from "react-redux";
import { useLogOutCustomerMutation, useUpdateCustomeryProfileMutation } from "../../redux/apis/customerApi";
import { useGetAllCustomerBookingQuery } from "../../redux/apis/bookingApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaUserCircle, FaEnvelope, FaPen, FaSignOutAlt, FaTimes, FaCamera, FaCalendarAlt, FaCheckCircle, FaClock, FaIdCard } from 'react-icons/fa';

const CustomerProfile = () => {
    const { customer } = useSelector((state) => state.auth);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Profile photo upload states
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [shouldRemoveImage, setShouldRemoveImage] = useState(false);

    const navigate = useNavigate();
    const [logOutCustomer, { isSuccess: isLogOutSuccess }] = useLogOutCustomerMutation();
    const [updateCustomer] = useUpdateCustomeryProfileMutation();
    
    // Fetch live customer bookings
    const { data: bookings, isLoading: bookingsLoading } = useGetAllCustomerBookingQuery();

    const totalBookings = bookings?.length || 0;
    const acceptedBookings = bookings?.filter(b => b.status === 'accept').length || 0;
    const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;

    const formik = useFormik({
        initialValues: {
            name: selectedProfile ? selectedProfile.name : "",
            email: selectedProfile ? selectedProfile.email : "",
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            email: yup.string().email("Invalid Email").required("Enter Email"),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("email", values.email);
                
                if (customer?.image) {
                    formData.append("oldimage", customer.image);
                }
                
                if (shouldRemoveImage) {
                    formData.append("removeImage", "true");
                } else if (selectedImage) {
                    formData.append("image", selectedImage);
                }

                const result = await updateCustomer({ id: customer?._id, formData });
                if (result?.data) {
                    toast.success("Profile updated successfully");
                    setIsModalOpen(false);
                    // Reset local upload states
                    setSelectedImage(null);
                    setImagePreview(null);
                    setShouldRemoveImage(false);
                } else {
                    toast.error(result?.error?.data?.message || "Update failed");
                }
            } catch (error) {
                toast.error("An error occurred during update");
            }
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setShouldRemoveImage(false);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setShouldRemoveImage(true);
    };

    useEffect(() => {
        if (isLogOutSuccess) {
            toast.success("Customer logged out successfully");
            navigate("/");
        }
    }, [isLogOutSuccess, navigate]);

    if (!customer) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    <p className="text-slate-500 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    const handleEditClick = () => {
        setSelectedProfile(customer);
        setSelectedImage(null);
        setImagePreview(customer.image || null);
        setShouldRemoveImage(false);
        setIsModalOpen(true);
    };

    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(" ");
        if (parts.length > 1) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name[0].toUpperCase();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-slate-50 via-indigo-50/20 to-rose-50/20 p-4 pt-28 pb-16 relative overflow-hidden animate-fade-in">
            {/* Background blur highlights */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-pulse-glow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 animate-scale-in">
                {/* Left Column - Profile Card */}
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-xl shadow-slate-100/30 rounded-[2.5rem] p-6 text-center relative overflow-hidden">
                        {/* Top Gradient bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"></div>
                        
                        {/* Avatar Squircle Container */}
                        <div className="relative inline-block mt-4 mb-5">
                            <div className="relative inline-block p-1.5 rounded-[2rem] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-amber-400 shadow-xl shadow-indigo-500/10">
                                <div className="relative w-28 h-28 rounded-[1.8rem] overflow-hidden border-2 border-white/95 bg-slate-100">
                                    {customer.image ? (
                                        <img 
                                            src={customer.image} 
                                            alt={customer.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold text-4xl flex items-center justify-center">
                                            {getInitials(customer.name)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <h1 className="text-2xl font-display font-black text-slate-800 leading-tight truncate">{customer.name || "Customer"}</h1>
                        <p className="text-slate-450 text-xs font-semibold mt-1">Customer Account</p>
                        
                        <div className="mt-8 space-y-3">
                            <button
                                onClick={handleEditClick}
                                className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-3 rounded-2xl transition-all shadow-md shadow-indigo-500/15 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
                            >
                                <FaPen className="text-xs" /> Edit Profile
                            </button>
                            <button
                                onClick={() => logOutCustomer()}
                                className="w-full bg-rose-50/50 hover:bg-rose-100 text-rose-600 font-bold py-3 rounded-2xl border border-rose-100 hover:border-rose-200 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
                            >
                                <FaSignOutAlt className="text-sm" /> Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats & Info */}
                <div className="md:col-span-8 space-y-6">
                    {/* Profile Details Panel */}
                    <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-xl shadow-slate-100/30 rounded-[2.5rem] p-6 space-y-5">
                        <h3 className="text-lg font-display font-black text-slate-800 border-b border-slate-100/60 pb-3 flex items-center gap-2 pl-1">
                            <FaIdCard className="text-indigo-500" /> Account Overview
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/40 border border-slate-100/50">
                                <FaUserCircle className="text-indigo-500 text-2xl flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-slate-400 text-3xs font-bold uppercase tracking-wider block">Full Name</span>
                                    <span className="text-slate-800 font-extrabold text-sm truncate block">{customer?.name || "Not Provided"}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/40 border border-slate-100/50">
                                <FaEnvelope className="text-indigo-500 text-2xl flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-slate-400 text-3xs font-bold uppercase tracking-wider block">Email Address</span>
                                    <span className="text-slate-800 font-semibold font-mono text-sm truncate block">{customer?.email || "Not Provided"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Booking Statistics */}
                    <div className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-xl shadow-slate-100/30 rounded-[2.5rem] p-6">
                        <h3 className="text-lg font-display font-black text-slate-800 border-b border-slate-100/60 pb-3 mb-4 flex items-center gap-2 pl-1">
                            <FaCalendarAlt className="text-indigo-500" /> Service Analytics
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Total Bookings Card */}
                            <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-50/50 via-indigo-50/10 to-transparent border border-indigo-100/30 relative overflow-hidden group hover:scale-[1.02] transition-all">
                                <div className="absolute -right-4 -bottom-4 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
                                    <FaCalendarAlt className="text-6xl" />
                                </div>
                                <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider pl-1">Total</span>
                                <div className="text-3xl font-display font-black text-slate-900 mt-2 pl-1">
                                    {bookingsLoading ? <span className="animate-pulse">...</span> : totalBookings}
                                </div>
                                <span className="text-3xs text-indigo-600 font-bold block mt-1 pl-1">Booked Services</span>
                            </div>

                            {/* Accepted Bookings Card */}
                            <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-50/50 via-emerald-50/10 to-transparent border border-emerald-100/30 relative overflow-hidden group hover:scale-[1.02] transition-all">
                                <div className="absolute -right-4 -bottom-4 text-emerald-500/10 group-hover:scale-110 transition-transform duration-500">
                                    <FaCheckCircle className="text-6xl" />
                                </div>
                                <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider pl-1">Accepted</span>
                                <div className="text-3xl font-display font-black text-slate-900 mt-2 pl-1">
                                    {bookingsLoading ? <span className="animate-pulse">...</span> : acceptedBookings}
                                </div>
                                <span className="text-3xs text-emerald-600 font-bold block mt-1 pl-1">Confirmed Jobs</span>
                            </div>

                            {/* Pending Requests Card */}
                            <div className="p-4 rounded-2xl bg-gradient-to-tr from-amber-50/50 via-amber-50/10 to-transparent border border-amber-100/30 relative overflow-hidden group hover:scale-[1.02] transition-all">
                                <div className="absolute -right-4 -bottom-4 text-amber-500/10 group-hover:scale-110 transition-transform duration-500">
                                    <FaClock className="text-6xl" />
                                </div>
                                <span className="text-slate-500 text-xs font-bold block uppercase tracking-wider pl-1">Pending</span>
                                <div className="text-3xl font-display font-black text-slate-900 mt-2 pl-1">
                                    {bookingsLoading ? <span className="animate-pulse">...</span> : pendingBookings}
                                </div>
                                <span className="text-3xs text-amber-600 font-bold block mt-1 pl-1">Awaiting Response</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-md z-50 p-4 animate-fade-in">
                    <div className="bg-white/90 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2.5rem] p-6 w-full max-w-sm relative animate-scale-in">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-650 p-1.5 rounded-lg hover:bg-slate-100/50 transition-colors"
                        >
                            <FaTimes className="text-base" />
                        </button>

                        <h2 className="text-xl font-display font-black text-slate-800 mb-4">Edit Profile</h2>
                        
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {/* Profile Image Editor */}
                            <div className="flex flex-col items-center mb-4 bg-white/40 p-4 rounded-3xl border border-slate-100/60">
                                <div className="relative group w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center bg-slate-100 flex-shrink-0 shadow-inner">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-slate-400 text-sm font-bold uppercase">{getInitials(formik.values.name || customer.name)}</span>
                                    )}
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <FaCamera className="text-white text-base" />
                                    </div>
                                </div>
                                <div className="flex gap-2.5 mt-3">
                                    <label htmlFor="modal-image" className="cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-all">
                                        Change Photo
                                    </label>
                                    <input 
                                        type="file" 
                                        id="modal-image" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={handleImageChange} 
                                    />
                                    {(imagePreview || customer.image) && (
                                        <>
                                            <span className="text-slate-300">|</span>
                                            <button 
                                                type="button" 
                                                onClick={handleRemoveImage}
                                                className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:underline transition-all"
                                            >
                                                Remove Photo
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 pl-1 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    {...formik.getFieldProps("name")}
                                    className="w-full px-3 py-3 bg-white/60 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all duration-300 font-semibold text-slate-800 text-sm"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-rose-500 text-xs mt-1 pl-1 font-medium">{formik.errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5 pl-1 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    {...formik.getFieldProps("email")}
                                    className="w-full px-3 py-3 bg-white/60 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all duration-300 font-semibold text-slate-800 text-sm"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-rose-500 text-xs mt-1 pl-1 font-medium">{formik.errors.email}</p>
                                )}
                            </div>
                            
                            <div className="flex gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-1/2 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold py-2.5 rounded-2xl border border-slate-200/80 transition-all hover:scale-[1.01] active:scale-[0.99] text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-2.5 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] text-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerProfile;
