import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiLayers, FiBriefcase, FiCalendar, FiPlus, FiUser } from 'react-icons/fi';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/admin-dashboard', label: 'Overview', icon: <FiGrid /> },
        { path: '/admin/customer-page', label: 'Customers', icon: <FiUsers /> },
        { path: '/admin/agency-page', label: 'Agencies', icon: <FiLayers /> },
        { path: '/admin/professional-page', label: 'Professionals', icon: <FiBriefcase /> },
        { path: '/admin/normal-professional-booking', label: 'All Bookings', icon: <FiCalendar /> },
        { path: '/admin/profile', label: 'My Profile', icon: <FiUser /> },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 h-full shadow-lg z-35 transition-all duration-300">
            <div className="flex-1 py-6 px-4 space-y-7">
                {/* Navigation Menu */}
                <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 block mb-3">Management</span>
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                                        isActive
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                            : 'hover:bg-slate-800 hover:text-white text-slate-400'
                                    }`}
                                >
                                    <span className={`text-lg transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`}>
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Add Professional Quick Action Button */}
            <div className="p-4 border-t border-slate-800">
                <Link to="/admin/add-professional">
                    <button className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:translate-y-0 transform hover:-translate-y-0.5 text-sm">
                        <FiPlus className="text-base" />
                        <span>Add Professional</span>
                    </button>
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
