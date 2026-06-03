import React, { useState } from "react";
import { useGetAllAgencyprofessionalBookingsQuery } from "../../redux/apis/bookingApi";
import Loader from "../../share/Loader";
import { 
    FaCalendarCheck, 
    FaUser, 
    FaEnvelope, 
    FaCalendarAlt, 
    FaRegClock, 
    FaSearch, 
    FaBuilding 
} from "react-icons/fa";

const AgencyProfessionalBooking = () => {
    const { data, isLoading, isError, error, refetch } = useGetAllAgencyprofessionalBookingsQuery();
    
    // Search and Pagination States
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    if (isLoading) return <Loader text="Loading bookings list..." />;
    
    if (isError) {
        return (
            <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm my-12">
                <p className="text-lg font-bold text-red-500 mb-2">Error loading bookings</p>
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

    const bookingsList = data || [];
    
    // Search filter
    const filteredBookings = bookingsList.filter((booking) => {
        const customerName = booking.customerId?.name || "";
        const professionalName = booking.agencyProfessionalId?.name || "";
        const details = booking.desc || "";
        return (
            customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            professionalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            details.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const totalItems = filteredBookings.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPageData = filteredBookings.slice(
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
            
            {/* Header & Search */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Professional Bookings</h2>
                    <p className="text-xs text-slate-400 font-medium mt-1">Audit customer bookings schedules assigned to your agency associates.</p>
                </div>

                <div className="relative w-full sm:w-64 shrink-0">
                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search by customer, associate..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 text-xs font-semibold bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-700"
                    />
                </div>
            </div>

            {/* Bookings Card/Table */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                {currentPageData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                                    <th className="py-4 px-6">Customer Details</th>
                                    <th className="py-4 px-6">Assigned Associate</th>
                                    <th className="py-4 px-6 text-center">Schedule</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((booking, index) => (
                                    <tr key={index} className="hover:bg-slate-50/30 border-b border-slate-50 transition-colors">
                                        
                                        {/* Customer Details */}
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-sm font-bold shrink-0">
                                                    {booking.customerId?.name?.charAt(0).toUpperCase() || <FaUser />}
                                                </div>
                                                <div>
                                                    <h5 className="font-extrabold text-slate-700 leading-tight">
                                                        {booking.customerId?.name || "Independent Booking"}
                                                    </h5>
                                                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                                                        <FaEnvelope className="text-[10px] text-slate-350" />
                                                        {booking.customerId?.email || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Assigned Professional */}
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-bold shrink-0 shadow-inner">
                                                    {booking.agencyProfessionalId?.name?.charAt(0).toUpperCase() || <FaBuilding />}
                                                </div>
                                                <div>
                                                    <h5 className="font-extrabold text-slate-700 leading-tight">
                                                        {booking.agencyProfessionalId?.name || "Associate N/A"}
                                                    </h5>
                                                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
                                                        <FaEnvelope className="text-[10px] text-slate-350" />
                                                        {booking.agencyProfessionalId?.email || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Schedule Date & Time */}
                                        <td className="py-5 px-6 text-center">
                                            <div className="inline-flex flex-col items-center gap-1 bg-slate-50 border border-slate-100/50 px-3 py-1.5 rounded-xl">
                                                <span className="text-[10px] font-extrabold text-slate-700 flex items-center gap-1.5">
                                                    <FaCalendarAlt className="text-[10px] text-emerald-500" />
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

                                        {/* Status */}
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-16 text-center max-w-sm mx-auto space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-xl shadow-inner mx-auto">
                            <FaCalendarCheck />
                        </div>
                        <p className="text-base font-bold text-slate-700">No Bookings Found</p>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            No requests match your search query. Booking updates will appear here dynamically.
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

export default AgencyProfessionalBooking;
