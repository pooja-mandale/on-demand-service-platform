import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
    useGetProfessionalProfileQuery, 
    useLogOutProfessionalMutation 
} from "../../redux/apis/professionalApi";
import { 
    FaCompass, 
    FaClipboardList, 
    FaUserCircle, 
    FaSignOutAlt, 
    FaBars, 
    FaTimes,
    FaBriefcase,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from "react-icons/fa";
import toast from "react-hot-toast";

const ProfessionalLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const { data: profile, isLoading, refetch } = useGetProfessionalProfileQuery();
    const [logOutProfessional, { isSuccess: logOutSuccess }] = useLogOutProfessionalMutation();

    useEffect(() => {
        if (logOutSuccess) {
            navigate("/");
            toast.success("Successfully logged out");
        }
    }, [logOutSuccess, navigate]);

    const handleLogout = async () => {
        try {
            await logOutProfessional().unwrap();
        } catch (err) {
            toast.error("Logout failed. Please try again.");
        }
    };

    const navLinks = [
        {
            path: "/professional/professional-dashboard",
            name: "Overview",
            icon: <FaCompass className="text-lg" />
        },
        {
            path: "/professional/professional-bookings",
            name: "My Bookings",
            icon: <FaClipboardList className="text-lg" />
        },
        {
            path: "/professional/professional-profile",
            name: "Edit Profile",
            icon: <FaUserCircle className="text-lg" />
        }
    ];

    const getLinkClasses = (path) => {
        const isActive = location.pathname === path;
        return `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
            isActive 
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 translate-x-1" 
                : "text-slate-400 hover:text-white hover:bg-slate-800/60 font-semibold"
        }`;
    };

    const categoryName = profile?.categories 
        ? profile.categories.charAt(0).toUpperCase() + profile.categories.slice(1) 
        : "Professional";

    return (
        <div className="h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden font-sans">
            
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800/80 z-50 transform md:relative md:transform-none transition-transform duration-300 ease-out shrink-0 ${
                isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}>
                {/* Header/Branding */}
                <div className="p-6 border-b border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/30">
                            OD
                        </div>
                        <div>
                            <h2 className="font-extrabold text-white leading-tight tracking-tight">Pro Portal</h2>
                            <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-wider">Independent</span>
                        </div>
                    </div>
                    {/* Mobile Close Button */}
                    <button 
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={getLinkClasses(link.path)}
                        >
                            {link.icon}
                            <span className="text-sm">{link.name}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logged in User Profile Info */}
                <div className="p-5 border-t border-slate-900">
                    <div className="flex items-center gap-3.5 bg-slate-900/40 border border-slate-900 p-3.5 rounded-2xl">
                        <img 
                            src={profile?.image || "https://res.cloudinary.com/da5klmpqb/image/upload/v1721291355/download_w2o5rv.jpg"} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-xl object-cover border border-slate-800 shadow-sm" 
                        />
                        <div className="overflow-hidden flex-1">
                            <h4 className="font-bold text-white text-xs truncate leading-tight">{profile?.name || "Professional"}</h4>
                            <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-wider block truncate mt-0.5">{categoryName}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Top Header */}
                <header className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-6 shrink-0 relative z-30">
                    {/* Left: Mobile Toggle & Page Title */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="md:hidden w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all"
                        >
                            <FaBars />
                        </button>
                        <h1 className="text-lg font-black text-slate-800 tracking-tight capitalize">
                            {location.pathname.split("/").pop()?.replace("professional-", "") || "Dashboard"}
                        </h1>
                    </div>

                    {/* Right: Actions / Info */}
                    <div className="flex items-center gap-5">
                        {/* Quick User summary */}
                        <div className="hidden sm:flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-700 leading-none">{profile?.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold mt-1 block">{profile?.email}</span>
                        </div>
                        
                        <div className="h-8 w-px bg-slate-100 hidden sm:block" />

                        {/* Logout Trigger */}
                        <button 
                            onClick={handleLogout}
                            title="Log Out"
                            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 rounded-xl transition-all shadow-sm"
                        >
                            <FaSignOutAlt className="text-sm shrink-0" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Container for child page components */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 sm:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProfessionalLayout;
