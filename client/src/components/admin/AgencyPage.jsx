import React, { useState } from "react";
import { useGetAllAgencyQuery } from "../../redux/apis/adminApi";
import { Link } from "react-router-dom";
import { FiSearch, FiChevronLeft, FiChevronRight, FiBriefcase, FiMail, FiPhone, FiMapPin, FiEye } from 'react-icons/fi';
import Loader from '../../share/Loader';

const AgencyPage = () => {
    const { data, error, isLoading } = useGetAllAgencyQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 5;

    if (isLoading) {
        return <Loader fullScreen={false} text="Fetching agency records..." />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-soft">
                <p className="text-red-500 font-bold mb-2">Error loading agencies</p>
                <p className="text-slate-400 text-xs">Could not retrieve registered agency profiles.</p>
            </div>
        );
    }

    // Filter logic
    const filteredAgencies = data
        ? data.filter(agency => 
            agency.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agency.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agency.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agency._id?.includes(searchQuery)
          )
        : [];

    // Pagination logic
    const totalPages = Math.ceil(filteredAgencies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredAgencies.slice(startIndex, startIndex + itemsPerPage);

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
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Marketplace Partners</span>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">Agencies</h1>
                <p className="text-slate-500 text-xs sm:text-sm">Inspect and manage registered service providers and vetting agencies.</p>
            </div>

            {/* List Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                    <input
                        type="text"
                        placeholder="Search agencies by name, email or city..."
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
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Agency ID</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Agency Name</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Contact Info</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Location</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Description</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((agency) => (
                                    <tr key={agency._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="py-4 px-4 font-mono text-slate-400 text-xs">{agency._id}</td>
                                        <td className="py-4 px-4 font-bold text-slate-850 flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                                {agency.name?.charAt(0) || <FiBriefcase />}
                                            </div>
                                            <span>{agency.name}</span>
                                        </td>
                                        <td className="py-4 px-4 text-slate-650 space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <FiMail className="text-slate-400 text-xs" />
                                                <span>{agency.email}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <FiPhone className="text-slate-400 text-xs" />
                                                <span className="font-mono">{agency.phone}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-slate-650">
                                            <div className="flex items-center gap-1.5">
                                                <FiMapPin className="text-slate-400 text-xs flex-shrink-0" />
                                                <span className="truncate max-w-[150px]" title={agency.address}>{agency.address}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-slate-400 text-xs italic">
                                            <div className="truncate max-w-[200px]" title={agency.description}>
                                                {agency.description || "No description provided."}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white border border-indigo-100 hover:border-indigo-600 text-indigo-600 font-bold rounded-xl transition-all shadow-sm text-xs cursor-pointer">
                                                <FiEye /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-slate-400">
                                        No agencies found.
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

export default AgencyPage;
