import React, { useEffect, useState } from "react";
import {
    useAcceptBookingProfessionalMutation,
    useGetProfessionalBookingsQuery,
    useRejectBookingProfessionalMutation,
} from "../../redux/apis/bookingApi";
import toast from "react-hot-toast";
import Loader from "../../share/Loader";
import { 
    FaClipboardList, 
    FaCheck, 
    FaTimes, 
    FaSearch, 
    FaFilter, 
    FaCalendarAlt, 
    FaRegClock, 
    FaUser, 
    FaEnvelope 
} from "react-icons/fa";

const ProfessionalBookings = () => {
    const [acceptBooking, { isLoading: isAccepting }] = useAcceptBookingProfessionalMutation();
    const [rejectBooking, { isLoading: isRejecting }] = useRejectBookingProfessionalMutation();
    
    // Fetch data using correct professional bookings query hook
    const { data, isLoading, isError, error, refetch } = useGetProfessionalBookingsQuery();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'pending', 'accept', 'reject'
    const itemsPerPage = 5;

    const handleAccept = async (id) => {
        try {
            await acceptBooking(id).unwrap();
            toast.success("Booking Accepted Successfully");
            refetch();
        } catch (err) {
            toast.error("Failed to accept booking");
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectBooking(id).unwrap();
            toast.success("Booking Rejected Successfully");
            refetch();
        } catch (err) {
            toast.error("Failed to reject booking");
        }
    };

    // Filter and search bookings
    const bookingsList = data ? Object.values(data || {}) : [];
    const filteredBookings = bookingsList.filter((booking) => {
        const matchesSearch = 
            booking.customerId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking._id?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
            statusFilter === "all" || 
            booking.status === statusFilter;
            
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Reset pagination on filter or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    if (isLoading) return <Loader text="Loading bookings list..." />;
    if (isError) {
        return (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm my-12">
                <p className="text-lg font-bold text-red-500 mb-2">Error loading bookings</p>
                <p className="text-slate-500 text-sm">{error?.message || "An unexpected error occurred."}</p>
                <button 
                    onClick={() => refetch()} 
                    className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Header & Controls Panel */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Booking Requests</h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">Review and manage job bookings from your customers.</p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                    
                    {/* Search bar */}
                    <div className="relative flex-1 sm:w-64">
                        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search by customer, details..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-700"
                        />
                    </div>

                    {/* Status filter selection tabs */}
                    <div className="flex bg-slate-50 border border-slate-100 p-1 rounded-xl gap-1">
                        {[
                            { value: "all", label: "All" },
                            { value: "pending", label: "Pending" },
                            { value: "accept", label: "Accepted" },
                            { value: "reject", label: "Rejected" }
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setStatusFilter(tab.value)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 ${
                                    statusFilter === tab.value
                                        ? "bg-white text-indigo-600 shadow-sm border border-slate-100/50"
                                        : "text-slate-400 hover:text-slate-700"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bookings Card/Table */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                {paginatedBookings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                                    <th className="py-4 px-6">Booking ID</th>
                                    <th className="py-4 px-6">Customer Details</th>
                                    <th className="py-4 px-6">Description</th>
                                    <th className="py-4 px-6 text-center">Schedule</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedBookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-50/30 border-b border-slate-50 transition-colors">
                                        
                                        {/* ID */}
                                        <td className="py-5 px-6 font-mono font-bold text-slate-400 text-[10px]">
                                            #{booking._id?.slice(-8).toUpperCase()}
                                        </td>

                                        {/* Customer Details */}
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold shrink-0 shadow-inner">
                                                    {booking.customerId?.name?.charAt(0).toUpperCase() || <FaUser />}
                                                </div>
                                                <div>
                                                    <h5 className="font-extrabold text-slate-700 leading-tight flex items-center gap-1.5">
                                                        {booking.customerId?.name || "Independent Booking"}
                                                    </h5>
                                                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                                                        <FaEnvelope className="text-[10px] text-slate-300" />
                                                        {booking.customerId?.email || booking.email || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Description */}
                                        <td className="py-5 px-6 max-w-xs">
                                            <p className="font-semibold text-slate-600 line-clamp-2 leading-relaxed">{booking.desc}</p>
                                        </td>

                                        {/* Schedule Date & Time */}
                                        <td className="py-5 px-6 text-center">
                                            <div className="inline-flex flex-col items-center gap-1 bg-slate-50 border border-slate-100/50 px-3 py-1.5 rounded-xl">
                                                <span className="text-[10px] font-extrabold text-slate-700 flex items-center gap-1.5">
                                                    <FaCalendarAlt className="text-[10px] text-indigo-500" />
                                                    {new Date(booking.date).toLocaleDateString(undefined, {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                                                    <FaRegClock className="text-[10px] text-slate-300" />
                                                    {booking.time || "N/A"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Status badge */}
                                        <td className="py-5 px-6 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                                                booking.status === "accept" || booking.status === "accepted"
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                    : booking.status === "reject" || booking.status === "rejected"
                                                    ? "bg-rose-50 text-rose-600 border-rose-100"
                                                    : "bg-amber-50 text-amber-600 border-amber-100"
                                            }`}>
                                                {booking.status === "accept" || booking.status === "accepted"
                                                    ? "Accepted" 
                                                    : booking.status === "reject" || booking.status === "rejected"
                                                    ? "Rejected" 
                                                    : "Pending"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-5 px-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {booking.status === "pending" ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleAccept(booking._id)}
                                                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                            title="Accept Booking"
                                                        >
                                                            <FaCheck className="text-xs" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(booking._id)}
                                                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                            title="Reject Booking"
                                                        >
                                                            <FaTimes className="text-xs" />
                                                        </button>
                                                    </>
                                                ) : booking.status === "accept" || booking.status === "accepted" ? (
                                                    <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
                                                        <FaCheck className="text-[10px]" />
                                                        <span>Confirmed</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 text-rose-600 text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-xl">
                                                        <FaTimes className="text-[10px]" />
                                                        <span>Rejected</span>
                                                    </div>
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
                            <FaClipboardList />
                        </div>
                        <p className="text-base font-bold text-slate-700">No Bookings Found</p>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            No requests match your current search/filter parameters. New customer requests will show up here.
                        </p>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <span className="text-[11px] text-slate-400 font-bold">
                            Showing page {currentPage} of {totalPages} ({filteredBookings.length} total)
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

export default ProfessionalBookings;
