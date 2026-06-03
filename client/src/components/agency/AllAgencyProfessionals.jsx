import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    useActiveAgencyProfessionalMutation, 
    useDeactiveAgencyProfessionalMutation, 
    useGetAllAgencyProfessionsQuery 
} from "../../redux/apis/agencyApi";
import toast from "react-hot-toast";
import Loader from "../../share/Loader";
import { 
    FaUsers, 
    FaSearch, 
    FaUserCheck, 
    FaUserSlash, 
    FaEye, 
    FaAward, 
    FaRupeeSign 
} from "react-icons/fa";

const AllAgencyProfessionals = () => {
    const [activeAccount, { isSuccess: activeAccountisSuccess }] = useActiveAgencyProfessionalMutation();
    const [deActiveAccount, { isSuccess: deActiveAccountisSuccess }] = useDeactiveAgencyProfessionalMutation();
    const { data, isSuccess, isError, isLoading, error, refetch } = useGetAllAgencyProfessionsQuery();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (activeAccountisSuccess) {
            toast.success("Account activated successfully.");
            refetch();
        }
    }, [activeAccountisSuccess, refetch]);

    useEffect(() => {
        if (deActiveAccountisSuccess) {
            toast.error("Account deactivated successfully.");
            refetch();
        }
    }, [deActiveAccountisSuccess, refetch]);

    if (isLoading) return <Loader text="Loading associates list..." />;
    
    if (isError) {
        return (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm my-12">
                <p className="text-lg font-bold text-red-500 mb-2">Error loading associates</p>
                <p className="text-slate-500 text-sm">{error?.data?.message || "An unexpected error occurred."}</p>
                <button 
                    onClick={() => refetch()} 
                    className="mt-4 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all"
                >
                    Retry
                </button>
            </div>
        );
    }

    const professionalsList = data || [];
    
    // Filter by search
    const filteredProfessionals = professionalsList.filter((item) => {
        return (
            item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.categories?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item._id?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const totalItems = filteredProfessionals.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPageData = filteredProfessionals.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header & Controls */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Associates Directory</h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">Manage service providers registered under your agency.</p>
                </div>

                <div className="relative w-full sm:w-64 shrink-0">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search by associate name, category..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-700"
                    />
                </div>
            </div>

            {/* Professionals table container */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                {currentPageData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                                    <th className="py-4 px-6">Associate Details</th>
                                    <th className="py-4 px-6">Categories</th>
                                    <th className="py-4 px-6 text-center">Experience</th>
                                    <th className="py-4 px-6 text-center">Hourly Rate</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-50/30 border-b border-slate-50 transition-colors">
                                        
                                        {/* Avatar & Details */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    className="h-10 w-10 rounded-xl object-cover border border-slate-100 shadow-sm"
                                                    src={item.image || "https://res.cloudinary.com/da5klmpqb/image/upload/v1721291355/download_w2o5rv.jpg"}
                                                    alt={item.name}
                                                />
                                                <div>
                                                    <h5 className="font-extrabold text-slate-700 leading-tight">{item.name}</h5>
                                                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{item.email}</span>
                                                    <span className="text-[9px] text-slate-350 font-bold block mt-0.5">{item.phone}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Categories */}
                                        <td className="py-4 px-6">
                                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100/50 uppercase tracking-wider">
                                                {item.categories}
                                            </span>
                                        </td>

                                        {/* Experience */}
                                        <td className="py-4 px-6 text-center">
                                            <span className="font-bold text-slate-600 text-xs inline-flex items-center gap-1">
                                                <FaAward className="text-indigo-500" />
                                                {item.experience} Years
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="py-4 px-6 text-center">
                                            <span className="font-bold text-slate-700 text-xs inline-flex items-center">
                                                <FaRupeeSign className="text-emerald-500" />
                                                {item.price}/hr
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-6 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                                                item.isActiveAccount
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                    : "bg-rose-50 text-rose-600 border-rose-100"
                                            }`}>
                                                {item.isActiveAccount ? "Active" : "Suspended"}
                                            </span>
                                        </td>

                                        {/* Action buttons */}
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {item.isActiveAccount ? (
                                                    <button
                                                        onClick={() => deActiveAccount(item._id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-100 rounded-xl transition-all shadow-sm"
                                                        title="Deactivate Account"
                                                    >
                                                        <FaUserSlash className="text-2xs" />
                                                        <span>Deactivate</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => activeAccount(item._id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-100 rounded-xl transition-all shadow-sm"
                                                        title="Activate Account"
                                                    >
                                                        <FaUserCheck className="text-2xs" />
                                                        <span>Activate</span>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-16 text-center max-w-sm mx-auto space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-xl shadow-inner mx-auto">
                            <FaUsers />
                        </div>
                        <p className="text-base font-bold text-slate-700">No Associates Registered</p>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            No associates match your search query. Add a new associate provider to list them here.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <span className="text-[11px] text-slate-400 font-bold">
                            Showing page {currentPage} of {totalPages} ({filteredProfessionals.length} total)
                        </span>
                        
                        <div className="flex gap-1.5">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider bg-white border border-slate-100 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50 disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider bg-white border border-slate-100 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50 disabled:bg-slate-50 disabled:text-slate-300 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAgencyProfessionals;
