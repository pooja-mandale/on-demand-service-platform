import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLogOutAgencyMutation } from "../../redux/apis/agencyApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { 
    FaBuilding, 
    FaEnvelope, 
    FaPhone, 
    FaMapMarkerAlt, 
    FaSignOutAlt,
    FaEdit,
    FaLock
} from "react-icons/fa";

const AgencyProfile = () => {
    const navigate = useNavigate();
    const [logOutAgency, { isSuccess }] = useLogOutAgencyMutation();
    const { agency } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Agency Logged Out");
            navigate("/");
        }
    }, [isSuccess, navigate]);

    if (!agency) {
        return (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm my-12">
                <p className="text-gray-500 text-sm">Loading profile details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header */}
            <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Agency Profile</h2>
                <p className="text-xs text-slate-400 font-medium mt-1">Audit and update your registered business profile.</p>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left: Avatar Column */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                        <FaBuilding className="text-4xl" />
                    </div>
                    <div>
                        <h3 className="text-base font-extrabold text-slate-800 leading-tight">{agency.name}</h3>
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100/50 uppercase tracking-wider mt-2">
                            Agency Manager
                        </span>
                    </div>

                    <div className="w-full h-px bg-slate-100 my-2" />

                    <div className="flex flex-col gap-2 w-full pt-1">
                        <button
                            onClick={() => toast("Profile edit functionality is managed by administrative staff.")}
                            className="flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-slate-600 py-2.5 px-4 font-bold text-xs rounded-xl transition-all"
                        >
                            <FaEdit className="text-xs" />
                            Request Edit
                        </button>
                        <button
                            onClick={logOutAgency}
                            className="flex items-center justify-center gap-2 w-full bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 text-rose-600 py-2.5 px-4 font-bold text-xs rounded-xl transition-all"
                        >
                            <FaSignOutAlt className="text-xs" />
                            Logout Session
                        </button>
                    </div>
                </div>

                {/* Right: Personal Details Column */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm md:col-span-2 space-y-6">
                    <h4 className="font-extrabold text-slate-800 text-sm border-b border-slate-100 pb-3">Corporate Identity</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaBuilding className="text-slate-350" /> Registered Name
                            </span>
                            <p className="text-xs font-bold text-slate-700 bg-slate-50/50 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                                {agency.name || "Not Provided"}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaEnvelope className="text-slate-355" /> Registered Email
                            </span>
                            <p className="text-xs font-bold text-slate-700 bg-slate-50/50 border border-slate-100 px-3.5 py-2.5 rounded-xl truncate" title={agency.email}>
                                {agency.email || "Not Provided"}
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaPhone className="text-slate-350" /> Business Hotline
                            </span>
                            <p className="text-xs font-bold text-slate-700 bg-slate-50/50 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                                {agency.phone || "Not Provided"}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FaLock className="text-slate-350" /> Account Level
                            </span>
                            <p className="text-xs font-bold text-slate-700 bg-slate-50/50 border border-slate-100 px-3.5 py-2.5 rounded-xl">
                                Standard Agency Account
                            </p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-slate-350" /> Headquarters Address
                        </span>
                        <p className="text-xs font-semibold text-slate-600 bg-slate-50/50 border border-slate-100 px-3.5 py-3 rounded-xl leading-relaxed">
                            {agency.address || "Not Provided"}
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AgencyProfile;
