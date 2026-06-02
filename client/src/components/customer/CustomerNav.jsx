import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiGrid, FiCalendar, FiLogIn, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";

const Navbar = () => {
    const { customer } = useSelector(state => state.auth);
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const hasDarkHero = location.pathname === "/" || location.pathname === "/service-page";
    const isNavbarLight = isScrolled || !hasDarkHero;

    const getLinkClasses = (path) => {
        const isActive = location.pathname === path;
        if (isNavbarLight) {
            return isActive
                ? "flex items-center space-x-1.5 text-indigo-600 font-bold px-3 py-1.5 rounded-lg bg-indigo-50/80 border border-indigo-100/50 shadow-sm transition-all duration-300 transform scale-102 text-xs sm:text-sm"
                : "flex items-center space-x-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-transparent transition-all duration-300 text-xs sm:text-sm";
        } else {
            return isActive
                ? "flex items-center space-x-1.5 text-white font-bold px-3 py-1.5 rounded-lg bg-white/20 border border-white/25 shadow-md backdrop-blur-sm transition-all duration-300 transform scale-102 text-xs sm:text-sm"
                : "flex items-center space-x-1.5 text-slate-200/90 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg border border-transparent transition-all duration-300 text-xs sm:text-sm";
        }
    };

    const navLinks = [
        { path: "/", label: "Home", icon: <FiHome className="text-base" /> },
        { path: "/service-page", label: "Services", icon: <FiGrid className="text-base" /> },
        { path: "/show-booking", label: "Bookings", icon: <FiCalendar className="text-base" /> },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                isNavbarLight 
                    ? "bg-white/90 backdrop-blur-lg shadow-lg shadow-slate-100/10 border-b border-slate-100/80 py-1.5" 
                    : "bg-transparent py-2.5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center h-12 w-full">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <img 
                            src={logo} 
                            alt="OnDemand Logo" 
                            className="w-8 h-8 rounded-xl object-contain shadow-md shadow-indigo-500/10 transform group-hover:rotate-6 transition-all duration-300"
                        />
                        <span className={`text-lg font-display font-black bg-gradient-to-r bg-clip-text text-transparent group-hover:opacity-90 transition-all duration-500 ${
                            isNavbarLight 
                                ? "from-slate-900 to-indigo-950" 
                                : "from-white via-indigo-100 to-white"
                        }`}>
                            OnDemand
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex space-x-1.5 items-center">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className={getLinkClasses(link.path)}>
                                {link.icon}
                                <span>{link.label}</span>
                            </Link>
                        ))}

                        <div className={`h-5 w-px mx-2 transition-colors duration-500 ${isNavbarLight ? "bg-slate-200/80" : "bg-white/20"}`}></div>

                        {customer ? (
                            <Link 
                                to="/profile" 
                                className={`flex items-center space-x-1.5 font-semibold px-3 py-1.5 rounded-lg border transition-all duration-300 text-xs sm:text-sm ${
                                    isNavbarLight
                                        ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50 border-slate-100 shadow-sm"
                                        : "text-white hover:text-indigo-200 hover:bg-white/10 border-white/15 shadow-md"
                                }`}
                            >
                                {customer?.image ? (
                                    <img 
                                        src={customer.image} 
                                        alt={customer.name} 
                                        className="w-6 h-6 rounded-full object-cover border border-indigo-200" 
                                    />
                                ) : (
                                    <FiUser className={`text-xl transition-colors duration-500 ${isNavbarLight ? "text-indigo-500" : "text-white/90"}`} />
                                )}
                                <span>{customer?.name}</span>
                            </Link>
                        ) : (
                            <Link 
                                to="/login" 
                                className={`px-4 py-1.5 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5 shadow-md text-xs sm:text-sm ${
                                    isNavbarLight
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-indigo-500/20 hover:shadow-indigo-500/35"
                                        : "bg-white hover:bg-indigo-50 text-indigo-600 shadow-white/10 hover:shadow-indigo-500/10"
                                }`}
                            >
                                <FiLogIn />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center flex-shrink-0">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`focus:outline-none p-2 rounded-xl transition-all duration-300 ${
                                isNavbarLight 
                                    ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50" 
                                    : "text-white hover:text-indigo-200 hover:bg-white/10"
                            }`}
                        >
                            {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xl py-4 flex flex-col items-center space-y-3 animate-fade-in-up">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center space-x-2 w-[85%] justify-center py-2 rounded-xl text-sm ${
                                location.pathname === link.path
                                    ? "bg-indigo-50 text-indigo-600 font-bold border border-indigo-100/50"
                                    : "text-slate-600 font-medium hover:text-indigo-600 hover:bg-slate-50"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                    <div className="w-[85%] h-px bg-slate-100"></div>
                    {customer ? (
                        <Link
                            to="/profile"
                            className="text-slate-700 font-semibold hover:text-indigo-600 flex items-center gap-2 w-[85%] justify-center py-2 rounded-xl hover:bg-slate-50 border border-slate-100 text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {customer.image ? (
                                <img 
                                    src={customer.image} 
                                    alt={customer.name} 
                                    className="w-6 h-6 rounded-full object-cover border border-indigo-200" 
                                />
                            ) : (
                                <FiUser className="text-lg text-indigo-500" />
                            )}
                            <span>{customer.name}</span>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-indigo-600 text-white font-semibold text-center w-[85%] py-2 rounded-xl shadow-lg shadow-indigo-500/20 text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
