import React, { useState } from 'react';
import { useGetAllprofessionalBookingsQuery } from '../../redux/apis/bookingApi';
import { FiSearch, FiChevronLeft, FiChevronRight, FiUser, FiCalendar, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Loader from '../../share/Loader';

const NormalProfessionalAllBookings = () => {
    const { data: bookings, isLoading, isError, error } = useGetAllprofessionalBookingsQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 5;

    if (isLoading) {
        return <Loader fullScreen={false} text="Fetching booking history..." />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-soft">
                <p className="text-red-500 font-bold mb-2">Error loading bookings</p>
                <p className="text-slate-400 text-xs">{error?.data?.message || 'Something went wrong'}</p>
            </div>
        );
    }

    // Filter logic
    const filteredBookings = bookings
        ? bookings.filter(booking => 
            booking.customerId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.professionalId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking._id?.includes(searchQuery)
          )
        : [];

    // Pagination logic
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

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

    const getStatusBadge = (status) => {
        switch (status) {
            case "accept":
                return (
                    <span className="inline-flex items-center gap-1 text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                        <FiCheckCircle className="text-xs" /> Accepted
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100/30">
                        <FiClock className="text-xs animate-pulse" /> Pending
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                        {status || 'Pending'}
                    </span>
                );
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Transactions</span>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">Bookings</h1>
                <p className="text-slate-500 text-xs sm:text-sm">Monitor all marketplace service bookings, match customer schedules, and track statuses.</p>
            </div>

            {/* List Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                    <input
                        type="text"
                        placeholder="Search bookings by customer, pro, or status..."
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
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Booking ID</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Customer Name</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Professional Name</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Schedule</th>
                                <th className="py-3 px-4 text-slate-500 font-bold uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((booking, idx) => (
                                    <tr key={booking._id || idx} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="py-4 px-4 font-mono text-slate-400 text-xs">{booking._id || 'N/A'}</td>
                                        <td className="py-4 px-4 font-bold text-slate-800">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                                    {booking.customerId?.name?.charAt(0) || <FiUser />}
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-slate-850">{booking.customerId?.name || 'N/A'}</span>
                                                    <span className="block text-slate-400 text-3xs font-semibold">{booking.customerId?.email || 'N/A'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="font-bold text-slate-800">{booking.professionalId?.name || 'N/A'}</div>
                                            <div className="text-slate-400 text-3xs font-semibold">{booking.professionalId?.email || 'N/A'}</div>
                                        </td>
                                        <td className="py-4 px-4 text-slate-650 space-y-1">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-700">
                                                <FiCalendar className="text-slate-400" />
                                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="text-slate-400 text-3xs">
                                                ID: {booking.professionalId?._id || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            {getStatusBadge(booking.status)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-slate-400">
                                        No bookings found.
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

export default NormalProfessionalAllBookings;