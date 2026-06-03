import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
    FaUsers, 
    FaCalendarCheck, 
    FaBuilding, 
    FaChartLine,
    FaArrowRight,
    FaUserPlus,
    FaCog
} from "react-icons/fa";

const AgencyDashboard = () => {
    const navigate = useNavigate();
    const { agency } = useSelector(state => state.auth);

    // Mock/quick overview numbers to make the agency portal look professional
    const overviewStats = [
        {
            label: "Agency Status",
            value: "Verified",
            badge: "Active",
            color: "emerald",
            icon: <FaBuilding className="text-emerald-500 text-lg" />
        },
        {
            label: "Total Associates",
            value: "12",
            badge: "+2 new",
            color: "indigo",
            icon: <FaUsers className="text-indigo-500 text-lg" />
        },
        {
            label: "Total Service Bookings",
            value: "48",
            badge: "Active schedule",
            color: "amber",
            icon: <FaCalendarCheck className="text-amber-500 text-lg" />
        },
        {
            label: "Performance Rating",
            value: "4.8 / 5.0",
            badge: "Top Rated",
            color: "rose",
            icon: <FaChartLine className="text-rose-500 text-lg" />
        }
    ];

    const actionCards = [
        {
            title: "Manage Professionals",
            desc: "Register, modify, or view professional providers associated with your agency.",
            btnText: "Manage Associates",
            btnColor: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10",
            icon: <FaUsers className="text-3xl text-emerald-500" />,
            action: () => navigate("/agency/professionals")
        },
        {
            title: "Service Requests",
            desc: "Review customer service bookings, dates, times, and client details.",
            btnText: "View Bookings",
            btnColor: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/10",
            icon: <FaCalendarCheck className="text-3xl text-indigo-500" />,
            action: () => navigate("/agency/professional-booking")
        },
        {
            title: "Agency Account Settings",
            desc: "Modify agency details, address, telephone numbers, and email details.",
            btnText: "Edit Profile",
            btnColor: "bg-purple-600 hover:bg-purple-700 shadow-purple-600/10",
            icon: <FaCog className="text-3xl text-purple-500" />,
            action: () => navigate("/agency/profile")
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 font-sans">
            
            {/* Welcome banner */}
            <div className="relative bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-100/30 rounded-full blur-3xl"></div>

                <div className="relative z-10 space-y-1">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100/50 uppercase tracking-wider">
                        Management Hub
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                        Welcome Back, {agency?.name || "Agency Manager"}!
                    </h2>
                    <p className="text-slate-500 text-xs font-medium max-w-2xl leading-relaxed">
                        Control your agency workforce, add expert professionals, audit bookings, and track customer request channels.
                    </p>
                </div>
            </div>

            {/* Overview Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {overviewStats.map((stat, i) => (
                    <div 
                        key={i} 
                        className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-300"
                    >
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{stat.label}</span>
                            <strong className="text-slate-800 font-extrabold text-lg block leading-none">{stat.value}</strong>
                            <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100/30 px-2 py-0.5 rounded-full inline-block mt-1">
                                {stat.badge}
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100/60 flex items-center justify-center shadow-inner shrink-0">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {actionCards.map((card, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                        <div className="space-y-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner">
                                {card.icon}
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-base font-extrabold text-slate-800 tracking-tight">{card.title}</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                            </div>
                        </div>

                        <button
                            onClick={card.action}
                            className={`mt-6 w-full text-white py-3 px-4 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${card.btnColor}`}
                        >
                            <span>{card.btnText}</span>
                            <FaArrowRight className="text-2xs" />
                        </button>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default AgencyDashboard;
