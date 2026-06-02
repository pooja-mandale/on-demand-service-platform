import React, { useState } from "react";
import { useGetAllCustomerBookingQuery } from "../../redux/apis/bookingApi";
import { FaUserCircle, FaCalendarAlt, FaClock, FaCheckCircle, FaExclamationCircle, FaBan, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Loader from "../../share/Loader";

const BookingTable = () => {
    const { data: bookings, isLoading, isError, error } = useGetAllCustomerBookingQuery();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    if (isLoading) {
        return <Loader text="Loading your bookings..." />;
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 text-center max-w-md">
                    <p className="text-lg font-bold text-red-500 mb-2">Error loading bookings</p>
                    <p className="text-slate-500 text-sm">
                        {error?.data?.message || "Something went wrong"}
                    </p>
                </div>
            </div>
        );
    }

    // Calculate the total pages
    const totalPages = Math.ceil((bookings?.length || 0) / itemsPerPage);

    // Slice the bookings for the current page
    const paginatedBookings = bookings?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "accept":
                return (
                    <span className="inline-flex items-center gap-1 text-2xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <FaCheckCircle className="text-3xs" /> Accepted
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 text-2xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100/50">
                        <FaExclamationCircle className="text-3xs" /> Pending
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 text-2xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
            <div className="text-center mb-10 space-y-2.5">
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Account Dashboard</span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">Your Bookings</h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">Manage and track your schedule, booking statuses, and professionals.</p>
            </div>

            {/* List of bookings */}
            <div className="space-y-4">
                {paginatedBookings?.length > 0 ? (
                    paginatedBookings.map((booking) => {
                        const professional = booking.professionalId || booking.agencyProfessionalId;
                        return (
                            <div 
                                key={booking._id} 
                                className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                {/* Professional Info */}
                                <div className="flex items-center gap-3.5">
                                    <div className="w-11 h-11 rounded-xl bg-indigo-50/60 border border-indigo-100/40 flex items-center justify-center text-indigo-600 text-xl shadow-sm flex-shrink-0">
                                        <FaUserCircle />
                                    </div>
                                    <div>
                                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-0.5">Booking ID: {booking._id}</span>
                                        <h3 className="font-extrabold text-slate-800 text-base leading-tight">{professional?.name || "N/A"}</h3>
                                        <p className="text-slate-500 text-xs mt-0.5">{professional?.email || "N/A"}</p>
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                        <FaCalendarAlt className="text-indigo-600" />
                                        <span>Date: <strong className="text-slate-800 font-semibold">{new Date(booking.date).toLocaleDateString()}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FaClock className="text-indigo-600" />
                                        <span>Time: <strong className="text-slate-800 font-semibold">{booking.time || "N/A"}</strong></span>
                                    </div>
                                </div>

                                {/* Status & Actions */}
                                <div className="flex items-center justify-between md:justify-end gap-4 border-t border-slate-50 pt-3 md:border-0 md:pt-0">
                                    {getStatusBadge(booking.status)}
                                    
                                    {booking.status === "pending" ? (
                                        <button
                                            className="px-4 py-2 bg-rose-50 hover:bg-rose-100/80 text-rose-600 font-bold rounded-xl border border-rose-100/50 hover:border-rose-200 transition-all flex items-center gap-1.5 shadow-sm text-xs sm:text-sm"
                                            onClick={() => console.log(`Cancel booking ${booking._id}`)}
                                        >
                                            <FaBan className="text-xs" /> Cancel
                                        </button>
                                    ) : (
                                        <button
                                            className="px-4 py-2 bg-slate-50 text-slate-400 font-semibold rounded-xl border border-slate-100 cursor-not-allowed text-xs sm:text-sm flex items-center gap-1.5"
                                            disabled
                                        >
                                            <FaBan className="text-xs" /> Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 shadow-soft max-w-md mx-auto">
                        <p className="text-base font-bold text-slate-700 mb-1.5">No Bookings Found</p>
                        <p className="text-slate-400 text-xs">You haven't scheduled any services yet. Explore our home services list to get started!</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2.5">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-slate-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <FaChevronLeft className="text-xs" />
                    </button>
                    <span className="px-4 py-1.5 bg-indigo-50/80 border border-indigo-100/50 rounded-xl text-indigo-700 font-bold text-xs sm:text-sm">
                        {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-slate-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <FaChevronRight className="text-xs" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookingTable;
