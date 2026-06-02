import React, { useState } from 'react';
import { useGetAllProfessionlsQuery, useActiveAccountMutation, useDeActiveAccountMutation } from '../../redux/apis/adminApi';
import toast from 'react-hot-toast';
import { FiSearch, FiChevronLeft, FiChevronRight, FiBriefcase, FiMail, FiPhone, FiAward, FiDollarSign, FiCheck, FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Loader from '../../share/Loader';

const ProfessionalTable = () => {
    const { data, isLoading, isError, error } = useGetAllProfessionlsQuery();
    const [activeAccount] = useActiveAccountMutation();
    const [deActiveAccount] = useDeActiveAccountMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 5;

    if (isLoading) return <Loader fullScreen={false} text="Fetching professional network..." />;
    if (isError) return (
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-soft">
            <p className="text-red-500 font-bold mb-2">Error loading profiles</p>
            <p className="text-slate-400 text-xs">{error?.data?.message || 'Something went wrong'}</p>
        </div>
    );

    // Toggle Account Status
    const handleToggleStatus = async (pro) => {
        try {
            if (pro.isActiveAccount) {
                await deActiveAccount(pro._id).unwrap();
                toast.success(`${pro.name}'s account is now deactivated.`);
            } else {
                await activeAccount(pro._id).unwrap();
                toast.success(`${pro.name}'s account is now activated!`);
            }
        } catch (err) {
            console.error("Status toggle error:", err);
            toast.error("Failed to update account status.");
        }
    };

    // Filter logic
    const filteredProfessionals = data
        ? data.filter(pro => 
            pro.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pro.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pro.categories?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pro._id?.includes(searchQuery)
          )
        : [];

    // Pagination logic
    const totalPages = Math.ceil(filteredProfessionals.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredProfessionals.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Marketplace Talents</span>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">Professionals</h1>
                <p className="text-slate-500 text-xs sm:text-sm">Manage independent service experts, check category skills, and moderate accounts.</p>
            </div>

            {/* List Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                    <input
                        type="text"
                        placeholder="Search by name, category, or email..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>

                {/* Table Container for Responsiveness */}
                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Professional Info</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Skills / Rate</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Experience</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Account Status</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((pro) => (
                                    <tr key={pro._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="py-4 px-4 font-bold text-slate-850">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-50 bg-gradient-to-tr from-indigo-50 to-indigo-100/50 flex items-center justify-center flex-shrink-0 text-indigo-600 font-black text-xs uppercase shadow-sm">
                                                    {pro.image ? (
                                                        <img
                                                            src={pro.image}
                                                            alt={pro.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <span>{pro.name?.charAt(0) || 'P'}</span>
                                                </div>
                                                <div className="space-y-0.5">
                                                    <span className="font-bold text-slate-800 text-sm block">{pro.name}</span>
                                                    <span className="text-slate-400 text-xs font-semibold block">{pro.email}</span>
                                                    <span className="text-slate-400 text-3xs font-mono block">ID: {pro._id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-slate-650 space-y-1.5">
                                            <span className="inline-block px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-650 font-bold text-3xs uppercase tracking-wider">
                                                {pro.categories}
                                            </span>
                                            <div className="text-slate-800 font-bold text-xs flex items-center">
                                                <FiDollarSign className="text-slate-400 mr-0.5" /> {pro.price}/hr
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-slate-650">
                                            <div className="flex items-center gap-1">
                                                <FiAward className="text-slate-400" />
                                                <span>{pro.experience} Years</span>
                                            </div>
                                            <span className="text-slate-450 font-medium text-3xs block mt-0.5">{pro.phone}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {pro.isActiveAccount ? (
                                                <span className="inline-flex items-center gap-1 text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                                    <FiCheckCircle className="text-xs" /> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-rose-50 text-rose-500 border border-rose-100/50">
                                                    <FiAlertCircle className="text-xs" /> Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <button
                                                onClick={() => handleToggleStatus(pro)}
                                                className={`inline-flex items-center gap-1 px-3.5 py-2 font-bold rounded-2xl border transition-all text-xs cursor-pointer shadow-sm ${
                                                    pro.isActiveAccount
                                                        ? 'bg-rose-50 hover:bg-rose-600 hover:text-white border-rose-100 hover:border-rose-600 text-rose-600'
                                                        : 'bg-emerald-55/10 hover:bg-emerald-600 hover:text-white border-emerald-100 hover:border-emerald-600 text-emerald-600'
                                                }`}
                                            >
                                                {pro.isActiveAccount ? (
                                                    <>
                                                        <FiX /> Deactivate
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiCheck /> Activate
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-slate-400">
                                        No professionals found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center pt-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="inline-flex items-center gap-1 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-indigo-600 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-xs cursor-pointer"
                        >
                            <FiChevronLeft className="text-sm" /> Previous
                        </button>
                        <span className="text-slate-500 text-xs font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center gap-1 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-indigo-600 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-xs cursor-pointer"
                        >
                            Next <FiChevronRight className="text-sm" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessionalTable;
