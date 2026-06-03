import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProfessionalProfileQuery } from '../../redux/apis/professionalApi';
import { useGetProfessionalBookingsQuery } from '../../redux/apis/bookingApi';
import { 
    FaUserCircle, 
    FaCalendarCheck, 
    FaHourglassHalf, 
    FaRupeeSign, 
    FaStar, 
    FaCompass, 
    FaHistory, 
    FaBookOpen,
    FaClipboardList
} from 'react-icons/fa';
import Loader from '../../share/Loader';
import clsx from 'clsx';

const ProfessionalDashboard = () => {
    // Fetch data using RTK Query
    const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useGetProfessionalProfileQuery();
    const { data: bookings, isLoading: isBookingsLoading, isError: isBookingsError } = useGetProfessionalBookingsQuery();

    if (isProfileLoading || isBookingsLoading) {
        return <Loader text="Loading your dashboard..." />;
    }

    if (isProfileError || isBookingsError) {
        return (
            <div className="flex justify-center items-center min-h-[80vh] bg-slate-50">
                <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 text-center max-w-md">
                    <p className="text-lg font-bold text-red-500 mb-2">Error loading dashboard</p>
                    <p className="text-slate-500 text-sm">Please try logging out and logging back in.</p>
                    <Link to="/login" className="mt-4 inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all">
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    // Calculate metrics
    const bookingsList = bookings || [];
    const totalBookings = bookingsList.length;
    const pendingBookings = bookingsList.filter(b => b.status === "pending").length;
    const acceptedBookings = bookingsList.filter(b => b.status === "accept" || b.status === "accepted").length;
    const hourlyRate = profile?.price || 0;
    const estimatedEarnings = acceptedBookings * hourlyRate;

    // Get category icon/name beautifully
    const categoryName = profile?.categories ? profile.categories.charAt(0).toUpperCase() + profile.categories.slice(1) : "Professional";

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Card Banner */}
            <div className="relative bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-100/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-100/30 rounded-full blur-3xl"></div>

                <div className="flex items-center gap-5 relative z-10">
                    <img 
                        src={profile?.image || "https://res.cloudinary.com/da5klmpqb/image/upload/v1721291355/download_w2o5rv.jpg"} 
                        alt={profile?.name} 
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200/80 shadow-md"
                    />
                    <div className="space-y-1">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100/50 uppercase tracking-wider">{categoryName}</span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Welcome Back, {profile?.name}!</h2>
                        <p className="text-slate-500 text-xs font-medium">Manage jobs, update rates, and view your schedule from one central portal.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl shrink-0 relative z-10 self-start sm:self-center">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 text-lg shadow-inner">
                        <FaStar />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rating</span>
                        <strong className="text-slate-800 font-extrabold text-sm sm:text-base">4.9 / 5.0</strong>
                    </div>
                </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Estimated Earnings */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 text-lg shadow-inner shrink-0">
                        <FaRupeeSign />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Earnings</span>
                        <strong className="text-slate-800 font-extrabold text-lg sm:text-xl leading-tight">₹{estimatedEarnings}</strong>
                    </div>
                </div>

                {/* Total Bookings */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 text-lg shadow-inner shrink-0">
                        <FaBookOpen />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
                        <strong className="text-slate-800 font-extrabold text-lg sm:text-xl leading-tight">{totalBookings}</strong>
                    </div>
                </div>

                {/* Pending Requests */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100/50 flex items-center justify-center text-amber-600 text-lg shadow-inner shrink-0">
                        <FaHourglassHalf className="text-base" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Requests</span>
                        <strong className="text-slate-800 font-extrabold text-lg sm:text-xl leading-tight">{pendingBookings}</strong>
                    </div>
                </div>

                {/* Accepted Bookings */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 text-lg shadow-inner shrink-0">
                        <FaCalendarCheck />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Accepted Jobs</span>
                        <strong className="text-slate-800 font-extrabold text-lg sm:text-xl leading-tight">{acceptedBookings}</strong>
                    </div>
                </div>
            </div>

            {/* Recent Bookings Panel */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                            <FaHistory className="text-xs" />
                        </div>
                        <h3 className="font-extrabold text-slate-800 text-base">Recent Booking Requests</h3>
                    </div>
                    <Link 
                        to="/professional/professional-bookings" 
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        View All Bookings &rarr;
                    </Link>
                </div>

                {bookingsList.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                                    <th className="py-4 px-6">Customer</th>
                                    <th className="py-4 px-6">Description</th>
                                    <th className="py-4 px-6">Date & Time</th>
                                    <th className="py-4 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingsList.slice(0, 5).map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-base font-bold shrink-0">
                                                    {booking.customerId?.name?.charAt(0).toUpperCase() || "C"}
                                                </div>
                                                <div>
                                                    <h5 className="font-extrabold text-slate-700 leading-tight">{booking.customerId?.name || "N/A"}</h5>
                                                    <span className="text-[10px] text-slate-400 font-semibold">{booking.customerId?.email || "N/A"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 max-w-xs truncate">
                                            <span className="font-medium text-slate-600">{booking.desc}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-0.5">
                                                <strong className="text-slate-700 font-semibold leading-none">{new Date(booking.date).toLocaleDateString()}</strong>
                                                <span className="text-[10px] text-slate-400 block font-bold">{booking.time || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={clsx(
                                                "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border",
                                                booking.status === "accept" || booking.status === "accepted"
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                    : booking.status === "reject" || booking.status === "rejected"
                                                    ? "bg-rose-50 text-rose-600 border-rose-100"
                                                    : "bg-amber-50 text-amber-600 border-amber-100"
                                            )}>
                                                {booking.status === "accept" ? "Accepted" : booking.status === "reject" ? "Rejected" : "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-12 text-center max-w-sm mx-auto space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-lg shadow-inner mx-auto">
                            <FaClipboardList />
                        </div>
                        <p className="text-base font-bold text-slate-700">No Bookings Yet</p>
                        <p className="text-slate-400 text-xs leading-relaxed">You don't have any booking requests scheduled. New requests will appear here once customers book your services.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessionalDashboard;
