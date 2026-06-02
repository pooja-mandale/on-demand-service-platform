import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBriefcase, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const AgencyNavbar = () => {
    const { agency } = useSelector(state => state.auth)
    const location = useLocation();

    const getLinkClasses = (path) =>
        location.pathname === path
            ? "flex items-center space-x-2 text-blue-500 font-bold transition"
            : "flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition";

    return (
        <nav className="bg-gray-100 border-b shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 text-2xl font-bold text-blue-500">
                        AgencyPortal
                    </div>
                    {/* Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/agency/agency-dashboard" className={getLinkClasses("/agency/agency-dashboard")}>
                            <FaHome />
                            <span>DashBoard</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link to="/agency/add-agency-professional" className={getLinkClasses("/agency/add-agency-professional")}>
                            <FaBriefcase />
                            <span>+Add Professional</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link to="/agency/professionals" className={getLinkClasses("/agency/professionals")}>
                            <FaBriefcase />
                            <span>All Professional's</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link to="/agency/professional-booking" className={getLinkClasses("/agency/professional-booking")}>
                            <FaBriefcase />
                            <span>All Professionl's Booking</span>

                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link to="/agency/profile" className={getLinkClasses("/agency/profile")}>
                            <FaUserCircle className="text-2xl" />
                            {/* <span>{agency.name}</span> */}

                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="text-gray-700 hover:text-blue-500 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AgencyNavbar;
