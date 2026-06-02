import React from 'react';
import { useGetAllCustomersQuery, useGetAllAgencyQuery, useGetAllProfessionlsQuery } from '../../redux/apis/adminApi';
import { useGetAllprofessionalBookingsQuery } from '../../redux/apis/bookingApi';
import { FiUsers, FiLayers, FiBriefcase, FiCalendar, FiArrowRight, FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Loader from '../../share/Loader';

const AdminDashboard = () => {
    const { data: customers, isLoading: loadingCustomers, isError: errorCustomers } = useGetAllCustomersQuery();
    const { data: agencies, isLoading: loadingAgencies, isError: errorAgencies } = useGetAllAgencyQuery();
    const { data: professionals, isLoading: loadingProfessionals, isError: errorProfessionals } = useGetAllProfessionlsQuery();
    const { data: bookings, isLoading: loadingBookings, isError: errorBookings } = useGetAllprofessionalBookingsQuery();

    const isLoading = loadingCustomers || loadingAgencies || loadingProfessionals || loadingBookings;
    const isError = errorCustomers || errorAgencies || errorProfessionals || errorBookings;

    if (isLoading) {
        return <Loader fullScreen={false} text="Preparing your overview dashboard..." />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-white border border-slate-100 rounded-3xl shadow-soft">
                <FiAlertTriangle className="text-4xl text-rose-500 mb-3 animate-bounce" />
                <h3 className="text-lg font-bold text-slate-800">Error Loading Dashboard</h3>
                <p className="text-slate-555 text-sm mt-1">We couldn't load the admin dashboard metrics. Please refresh the page or try again later.</p>
            </div>
        );
    }

    // Stats calculations
    const totalCustomers = customers?.length || 0;
    const totalAgencies = agencies?.length || 0;
    const totalProfessionals = professionals?.length || 0;
    const totalBookings = bookings?.length || 0;

    const stats = [
        {
            label: 'Total Customers',
            value: totalCustomers,
            icon: <FiUsers className="text-xl" />,
            color: 'from-emerald-500 to-teal-600',
            bg: 'bg-emerald-50 text-emerald-600',
            link: '/admin/customer-page'
        },
        {
            label: 'Registered Agencies',
            value: totalAgencies,
            icon: <FiLayers className="text-xl" />,
            color: 'from-amber-500 to-orange-600',
            bg: 'bg-amber-50 text-amber-600',
            link: '/admin/agency-page'
        },
        {
            label: 'Professionals',
            value: totalProfessionals,
            icon: <FiBriefcase className="text-xl" />,
            color: 'from-rose-500 to-pink-600',
            bg: 'bg-rose-50 text-rose-600',
            link: '/admin/professional-page'
        },
        {
            label: 'Total Bookings',
            value: totalBookings,
            icon: <FiCalendar className="text-xl" />,
            color: 'from-indigo-500 to-violet-600',
            bg: 'bg-indigo-50 text-indigo-600',
            link: '/admin/normal-professional-booking'
        }
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case "accept":
                return (
                    <span className="inline-flex items-center gap-1 text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                        <FiCheckCircle className="text-2xs" /> Accepted
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100/30">
                        <FiClock className="text-2xs animate-pulse" /> Pending
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

    // Get latest items for summaries
    const recentBookings = bookings?.slice(0, 5) || [];
    const recentProfessionals = professionals?.slice(0, 5) || [];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Greeting Header */}
            <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 leading-tight">Welcome, Admin!</h1>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">Here's a summary of the OnDemand service marketplace performance today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Link 
                        key={i} 
                        to={stat.link} 
                        className="group bg-white border border-slate-100 rounded-3xl p-6 shadow-soft hover:shadow-xl hover:border-slate-200/50 transition-all duration-300 flex items-center justify-between transform hover:-translate-y-1"
                    >
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{stat.label}</span>
                            <span className="text-3xl font-display font-black text-slate-900 group-hover:scale-105 transition-transform block">{stat.value}</span>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shadow-sm group-hover:rotate-6 transition-all duration-300`}>
                            {stat.icon}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings Card */}
                <div className="bg-white border border-slate-100 rounded-3xl shadow-soft p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-extrabold text-slate-800">Recent Bookings</h2>
                            <Link to="/admin/normal-professional-booking" className="text-xs font-bold text-indigo-650 hover:text-indigo-800 hover:underline flex items-center gap-1">
                                <span>View All</span>
                                <FiArrowRight />
                            </Link>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">Customer</th>
                                        <th className="py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">Professional</th>
                                        <th className="py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">Date</th>
                                        <th className="py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.length > 0 ? (
                                        recentBookings.map((booking, idx) => (
                                            <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                                                <td className="py-3 px-3">
                                                    <div className="font-extrabold text-slate-800">{booking.customerId?.name || 'N/A'}</div>
                                                    <div className="text-slate-400 text-3xs mt-0.5">{booking.customerId?.email || 'N/A'}</div>
                                                </td>
                                                <td className="py-3 px-3 text-slate-650 font-semibold">{booking.professionalId?.name || 'N/A'}</td>
                                                <td className="py-3 px-3 text-slate-500">{new Date(booking.date).toLocaleDateString()}</td>
                                                <td className="py-3 px-3">{getStatusBadge(booking.status)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-6 text-slate-400">No bookings available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recent Professionals Card */}
                <div className="bg-white border border-slate-100 rounded-3xl shadow-soft p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-extrabold text-slate-800">Recent Professionals</h2>
                            <Link to="/admin/professional-page" className="text-xs font-bold text-indigo-650 hover:text-indigo-800 hover:underline flex items-center gap-1">
                                <span>View All</span>
                                <FiArrowRight />
                            </Link>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">Name / Contact</th>
                                        <th className="py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">Category</th>
                                        <th className="py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">Experience</th>
                                        <th className="py-2.5 px-3 text-slate-500 font-bold uppercase tracking-wider">Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentProfessionals.length > 0 ? (
                                        recentProfessionals.map((pro, idx) => (
                                            <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                                                <td className="py-3 px-3">
                                                    <div className="font-extrabold text-slate-800">{pro.name}</div>
                                                    <div className="text-slate-400 text-3xs mt-0.5">{pro.email}</div>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 font-bold text-3xs uppercase tracking-wider">
                                                        {pro.categories}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-3 text-slate-650 font-semibold">{pro.experience} Years</td>
                                                <td className="py-3 px-3 text-slate-900 font-bold">₹{pro.price}/hr</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-6 text-slate-400">No professionals available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
