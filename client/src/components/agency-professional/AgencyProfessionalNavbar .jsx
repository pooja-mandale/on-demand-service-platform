import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
const AgencyProfessionalNavbar = () => {
    const { agency_professional } = useSelector(state => state.auth)
    const location = useLocation();  // Get the current path

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Left side: agency-professional-navbar text */}
                <div className="text-white text-xl font-semibold">
                    agency-professional-navbar
                </div>

                {/* Right side: Links */}
                <div className="flex space-x-4">
                    <Link
                        to="/agency-professional/profile"  // Replace with your desired path
                        className={`text-white px-4 py-2 rounded ${location.pathname === "/agency-professional/pofile" ? "bg-blue-500" : "hover:bg-gray-700"
                            }`}
                    >
                        <FaUserCircle className="text-2xl" />
                        <span>{agency_professional.name}</span>

                    </Link>
                    <Link
                        to="/agency-professional/booking-panel"  // Replace with your desired path
                        className={`text-white px-4 py-2 rounded ${location.pathname === "/agency-professional/booking-panel" ? "bg-blue-500" : "hover:bg-gray-700"
                            }`}
                    >
                        bookings
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default AgencyProfessionalNavbar;
