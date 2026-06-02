import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTool, FiDroplet, FiZap, FiGrid, FiArrowRight, FiSearch, FiShield, FiLock, FiSmile } from "react-icons/fi";

const HomePage = () => {
    const popularServices = [
        { id: 1, name: "Plumbing", icon: <FiTool />, path: "/all-plumbers", color: "text-indigo-600", bg: "bg-indigo-50", hoverBg: "group-hover:bg-indigo-600 group-hover:text-white" },
        { id: 2, name: "Cleaning", icon: <FiDroplet />, path: "/all-cleaning", color: "text-emerald-600", bg: "bg-emerald-50", hoverBg: "group-hover:bg-emerald-600 group-hover:text-white" },
        { id: 3, name: "Electrical", icon: <FiZap />, path: "/all-electricians", color: "text-amber-500", bg: "bg-amber-50", hoverBg: "group-hover:bg-amber-500 group-hover:text-white" },
        { id: 4, name: "Painting", icon: <FiGrid />, path: "/service-page", color: "text-violet-600", bg: "bg-violet-50", hoverBg: "group-hover:bg-violet-600 group-hover:text-white" },
    ];

    const serviceTypes = ["Plumbing", "Cleaning", "Electrical", "Painting"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer;
        const currentWord = serviceTypes[currentIndex];
        
        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayText(prev => prev.slice(0, -1));
            }, 60);
        } else {
            timer = setTimeout(() => {
                setDisplayText(currentWord.slice(0, displayText.length + 1));
            }, 120);
        }
        
        if (!isDeleting && displayText === currentWord) {
            timer = setTimeout(() => setIsDeleting(true), 1800);
        } else if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setCurrentIndex(prev => (prev + 1) % serviceTypes.length);
        }
        
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentIndex]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 animate-fade-in">
            {/* Hero Section */}
            <div className="relative h-[560px] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 hero-bg opacity-80 transform scale-100 transition-transform duration-1000"></div>
                {/* Background Glow Elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

                {/* Floating Badges */}
                <div className="absolute top-20 left-6 lg:left-16 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-white font-semibold text-xs shadow-lg animate-float-slow hidden md:flex">
                    <span className="text-sm">🧹</span> Cleaning Services
                </div>
                <div className="absolute bottom-20 right-6 lg:right-16 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-white font-semibold text-xs shadow-lg animate-float-medium hidden md:flex">
                    <span className="text-sm">🛠️</span> Plumbing Experts
                </div>
                <div className="absolute top-28 right-10 lg:right-28 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-white font-semibold text-xs shadow-lg animate-float-fast hidden md:flex">
                    <span className="text-sm">⚡</span> Electrical Upgrades
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6 mt-8 animate-fade-in-up">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 backdrop-blur-md shadow-sm">
                        Your Trusted Local Experts, Anytime
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight min-h-[100px] sm:min-h-[auto]">
                        Expert <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent border-r-2 border-indigo-400/80 pr-1 animate-pulse">{displayText}</span>, <br className="sm:hidden" />On Demand
                    </h1>
                    <p className="text-sm sm:text-base text-slate-200/90 max-w-xl mx-auto font-normal leading-relaxed">
                        Book trusted professionals for all your home service needs. Quick response, transparent pricing, and guaranteed satisfaction.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5 max-w-xl mx-auto bg-slate-900/60 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all duration-300">
                        <div className="flex-1 w-full bg-white/95 rounded-xl flex items-center px-4 py-2.5 border border-white shadow-inner focus-within:bg-white transition-colors duration-300">
                            <FiSearch className="text-slate-400 mr-3.5 text-base" />
                            <input
                                type="text"
                                placeholder="What service do you need today?"
                                className="w-full bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400 font-semibold text-sm"
                            />
                        </div>
                        <button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 text-sm">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Popular Services Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12 space-y-2.5 animate-fade-in-up">
                    <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">What we offer</span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-slate-900">Popular Services</h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-medium">Discover our most requested services and find the right professional for your needs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularServices.map((service, index) => (
                        <Link
                            key={service.id}
                            to={service.path}
                            className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-xl border border-slate-100/80 hover:border-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div>
                                <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-5 ${service.hoverBg} transition-all duration-300 shadow-sm`}>
                                    <span className={`text-xl ${service.color} transition-colors duration-300`}>{service.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">{service.name}</h3>
                                <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed font-medium">Professional {service.name.toLowerCase()} services tailored to your convenience.</p>
                            </div>
                            <div className="flex items-center text-indigo-600 font-bold text-xs sm:text-sm group-hover:translate-x-1.5 transition-all duration-300">
                                <span>Book Now</span>
                                <FiArrowRight className="ml-2 w-3.5 h-3.5 transition-transform duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Trust Section */}
            <div className="bg-slate-100/50 py-16 border-y border-slate-200/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-2.5 animate-fade-in-up">
                        <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Our Promise</span>
                        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">Why Customers Trust Us</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-white rounded-2xl border border-slate-100/80 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-5 text-indigo-600 shadow-inner">
                                <FiShield className="text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Verified Experts</h3>
                            <p className="text-slate-500 leading-relaxed text-xs sm:text-sm font-medium">All our service providers are thoroughly vetted, background checked, and verified.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-slate-100/80 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-5 text-emerald-600 shadow-inner">
                                <FiLock className="text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Secure Payment</h3>
                            <p className="text-slate-500 leading-relaxed text-xs sm:text-sm font-medium">Your payments are fully secure and protected under our booking system.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-slate-100/80 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-5 text-amber-500 shadow-inner">
                                <FiSmile className="text-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Satisfaction Guarantee</h3>
                            <p className="text-slate-500 leading-relaxed text-xs sm:text-sm font-medium">Premium quality assurance and value for money on every booking.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-850">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="space-y-5">
                            <h4 className="text-2xl font-display font-black text-white flex items-center gap-2">
                                <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">O</span>
                                OnDemand
                            </h4>
                            <p className="text-sm leading-relaxed">
                                Connecting you with vetted local professionals for high-quality home maintenance and repairs.
                            </p>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">Company</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                                <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">Services</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/all-plumbers" className="hover:text-indigo-400 transition-colors">Plumbing</Link></li>
                                <li><Link to="/all-electricians" className="hover:text-indigo-400 transition-colors">Electrical</Link></li>
                                <li><Link to="/all-cleaning" className="hover:text-indigo-400 transition-colors">Cleaning</Link></li>
                            </ul>
                        </div>

                        {/* Partners */}
                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">For Partners</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/professional-login" className="hover:text-indigo-400 transition-colors">Professional Login</Link></li>
                                <li><Link to="/agency/login" className="hover:text-indigo-400 transition-colors">Agency Login</Link></li>
                                <li><Link to="/admin/login" className="hover:text-indigo-400 transition-colors">Admin Login</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs space-y-2">
                        <div className="opacity-50 text-slate-400">© {new Date().getFullYear()} On-Demand Services. All Rights Reserved.</div>
                        <div className="text-indigo-400 font-bold tracking-wider uppercase text-[11px] hover:text-indigo-300 transition-colors duration-300">Developed & Designed by Pooja Mandale</div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
