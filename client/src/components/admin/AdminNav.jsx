import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useLogOutAdminMutation } from '../../redux/apis/adminApi';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';

const AdminNavbar = () => {
    const { admin } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [logOutAdmin, { isSuccess }] = useLogOutAdminMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin logged out successfully");
            navigate("/");
        }
    }, [isSuccess, navigate]);

    return (
        <header className="bg-slate-950 text-white w-full sticky top-0 z-40 border-b border-slate-800 shadow-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/admin/admin-dashboard" className="flex items-center gap-2.5 group">
                    <img 
                        src={logo} 
                        alt="OnDemand Logo" 
                        className="w-7 h-7 rounded-lg object-contain transform group-hover:rotate-6 transition-all duration-300"
                    />
                    <span className="text-md font-display font-black bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
                        OnDemand <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Admin</span>
                    </span>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <Link 
                        to="/admin/profile" 
                        className="flex items-center gap-2 hover:text-indigo-400 transition-colors text-slate-300 font-semibold text-sm py-1.5 px-3 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
                    >
                        <FaUserCircle className="text-lg text-indigo-400" />
                        <span>{admin?.name || 'Admin'}</span>
                    </Link>

                    <div className="h-4 w-px bg-slate-800"></div>

                    {/* Logout Button */}
                    <button 
                        onClick={logOutAdmin}
                        className="flex items-center gap-1.5 hover:text-rose-400 text-slate-400 transition-colors text-sm py-1.5 px-3 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20"
                        title="Sign Out"
                    >
                        <FaSignOutAlt className="text-xs" />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
