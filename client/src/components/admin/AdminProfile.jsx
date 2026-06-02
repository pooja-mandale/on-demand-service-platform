import React, { useEffect } from "react";
import { useGetAdminProfileQuery, useLogOutAdminMutation } from "../../redux/apis/adminApi";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiShield, FiLogOut } from 'react-icons/fi';
import Loader from "../../share/Loader";

const AdminProfile = () => {
    const { data, isLoading, isError, error } = useGetAdminProfileQuery();
    const navigate = useNavigate();
    const [logOutAdmin, { isSuccess }] = useLogOutAdminMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin logged out successfully");
            navigate("/");
        }
    }, [isSuccess, navigate]);

    if (isLoading) {
        return <Loader fullScreen={false} text="Loading profile..." />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-soft">
                <p className="text-red-500 font-bold mb-2">Error fetching profile</p>
                <p className="text-slate-400 text-xs">{error?.data?.message || "Unknown error occurred"}</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-8 px-4 animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">System Account</span>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">Admin Profile</h1>
                <p className="text-slate-500 text-xs sm:text-sm">Manage your credentials and view system account details.</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-soft relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-300/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-300/10 rounded-full blur-2xl"></div>

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative z-10">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-50 shadow-inner bg-gradient-to-tr from-indigo-50 to-indigo-100/50 flex items-center justify-center flex-shrink-0 text-indigo-600">
                        {data?.avatar ? (
                            <img
                                src={data.avatar}
                                alt="Admin Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FiUser className="text-4xl" />
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="text-center sm:text-left space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-2xs font-extrabold uppercase tracking-wider">
                            <FiShield /> Super Admin
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 leading-tight">{data?.name || "System Admin"}</h2>
                        <p className="text-slate-400 text-xs flex items-center justify-center sm:justify-start gap-1">
                            <FiMail /> {data?.email || "admin@ondemand.com"}
                        </p>
                    </div>
                </div>

                <div className="h-px bg-slate-100 my-8"></div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                    <button 
                        onClick={logOutAdmin}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-6 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-2xl border border-rose-100 hover:border-rose-200 transition-all shadow-sm text-sm cursor-pointer"
                    >
                        <FiLogOut />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
