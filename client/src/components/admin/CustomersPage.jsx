import React, { useEffect, useState } from 'react';
import { useGetAllCustomersQuery } from '../../redux/apis/adminApi';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FiSearch, FiChevronLeft, FiChevronRight, FiUser, FiEye, FiMail, FiCalendar } from 'react-icons/fi';
import Loader from '../../share/Loader';

const CustomersPage = () => {
    const { data, isSuccess, isError, error, isLoading } = useGetAllCustomersQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 5;

    if (isLoading) {
        return <Loader fullScreen={false} text="Fetching customer directory..." />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-soft">
                <p className="text-red-500 font-bold mb-2">Error loading customers</p>
                <p className="text-slate-400 text-xs">{error?.data?.message || 'Something went wrong'}</p>
            </div>
        );
    }

    // Filter logic
    const filteredCustomers = isSuccess
        ? data.filter(customer => 
            customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer._id?.includes(searchQuery)
          )
        : [];

    // Pagination logic
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

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
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">User Directory</span>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">Customers</h1>
                <p className="text-slate-500 text-xs sm:text-sm">Manage and inspect registered customer accounts and access details.</p>
            </div>

            {/* List Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                    <input
                        type="text"
                        placeholder="Search by name, email or ID..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1); // reset to page 1 on search
                        }}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>

                {/* Table Container for Responsiveness */}
                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Customer ID</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Name</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Email</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">{item._id}</td>
                                        <td className="py-3.5 px-4 font-bold text-slate-800 flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                                {item.name?.charAt(0) || <FiUser />}
                                            </div>
                                            <span>{item.name}</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-600 flex items-center gap-1.5 pt-4">
                                            <FiMail className="text-slate-400 text-xs" />
                                            <span>{item.email}</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <Link to="/profile">
                                                <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-55/10 hover:bg-indigo-600 hover:text-white border border-indigo-100/50 hover:border-indigo-600 text-indigo-600 font-bold rounded-xl transition-all shadow-sm text-xs cursor-pointer">
                                                    <FiEye /> View
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-slate-400">
                                        No customers found.
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

export default CustomersPage;
