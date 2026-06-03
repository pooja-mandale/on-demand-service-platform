import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogOutAgencyMutation } from "../../redux/apis/agencyApi";
import { 
    FaHome, 
    FaUserPlus, 
    FaUsers, 
    FaCalendarCheck, 
    FaUserCircle, 
    FaSignOutAlt, 
    FaBars, 
    FaTimes,
    FaBuilding
} from "react-icons/fa";
import toast from "react-hot-toast";

const AgencyLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const { agency } = useSelector(state => state.auth);
    const [logOutAgency, { isSuccess: logOutSuccess }] = useLogOutAgencyMutation();

    useEffect(() => {
        if (logOutSuccess) {
            navigate("/");
            toast.success("Agency LogOut Success");
        }
    }, [logOutSuccess, navigate]);

    const handleLogout = async () => {
        try {
            await logOutAgency().unwrap();
        } catch (err) {
            toast.error("Logout failed. Please try again.");
        }
    };

    const navLinks = [
        {
            path: "/agency/agency-dashboard",
            name: "Dashboard",
            icon: <FaHome className="text-lg" />
        },
        {
            path: "/agency/add-agency-professional",
            name: "Add Professional",
            icon: <FaUserPlus className="text-lg" />
        },
        {
            path: "/agency/professionals",
            name: "All Professionals",
            icon: <FaUsers className="text-lg" />
        },
        {
            path: "/agency/professional-booking",
            name: "All Bookings",
            icon: <FaCalendarCheck className="text-lg" />
        },
        {
            path: "/agency/profile",
            name: "Agency Profile",
            icon: <FaUserCircle className="text-lg" />
        }
    ];

    const getLinkClasses = (path) => {
        const isActive = location.pathname === path;
        return `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
            isActive 
                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 translate-x-1" 
                : "text-slate-400 hover:text-white hover:bg-slate-800/60 font-semibold"
        }`;
    };

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
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-600/30">
                            AP
                        </div>
                        <div>
                            <h2 className="font-extrabold text-white leading-tight tracking-tight">Agency Portal</h2>
                            <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">Manager</span>
                        </div>
                    </div>
                    {/* Mobile Close Button */}
                    <button 
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
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

                {/* Logged in Agency Info */}
                <div className="p-5 border-t border-slate-800">
                    <div className="flex items-center gap-3.5 bg-slate-850/40 border border-slate-800 p-3.5 rounded-2xl">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                            <FaBuilding className="text-base text-emerald-400" />
                        </div>
                        <div className="overflow-hidden flex-1">
                            <h4 className="font-bold text-white text-xs truncate leading-tight">{agency?.name || "Agency"}</h4>
                            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block truncate mt-0.5">{agency?.email || "Manager"}</span>
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
                            className="md:hidden w-10 h-10 rounded-xl bg-slate-55 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all"
                        >
                            <FaBars />
                        </button>
                        <h1 className="text-lg font-black text-slate-800 tracking-tight capitalize">
                            {location.pathname.split("/").pop()?.replace("agency-", "").replace("professionals", "All Professionals").replace("professional-booking", "All Bookings") || "Dashboard"}
                        </h1>
                    </div>

                    {/* Right: Actions / Info */}
                    <div className="flex items-center gap-5">
                        {/* Quick Agency summary */}
                        <div className="hidden sm:flex flex-col text-right">
                            <span className="text-xs font-bold text-slate-700 leading-none">{agency?.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Agency Owner</span>
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

export default AgencyLayout;
