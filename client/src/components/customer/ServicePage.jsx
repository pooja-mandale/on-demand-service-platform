import React from 'react';
import { Link } from 'react-router-dom';
import { FiTool, FiDroplet, FiZap } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import plumbingImg from '../../assets/plumbing.png';
import cleaningImg from '../../assets/cleaning.png';
import electricalImg from '../../assets/electrical.png';

const ServicePage = () => {
    return (
        <div className="bg-slate-50/50 min-h-screen flex flex-col pt-0 animate-fade-in">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white pt-28 pb-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent)]"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 animate-fade-in-up">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md mb-4">
                        🛠️ Premium Home Care Solutions
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight mb-4 text-white">Our Services</h1>
                    <p className="text-sm sm:text-base text-indigo-100/90 font-light max-w-xl mx-auto leading-relaxed">
                        Professional, high-quality, and secure home services designed to meet your specific maintenance and repair needs.
                    </p>
                </div>
            </section>

            {/* Service Categories Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-2.5 animate-fade-in-up">
                        <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Categories</span>
                        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">What We Offer</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Plumbing */}
                        <div className="group border border-slate-100 rounded-2xl p-4 text-center shadow-soft hover:shadow-2xl hover:border-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between animate-fade-in-up">
                            <div>
                                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-5">
                                    <img src={plumbingImg} alt="Plumbing" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                                        <FiTool className="text-lg" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">Plumbing</h3>
                                <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed font-medium">
                                    From leak repairs and piping to full kitchen and bathroom fixture installations.
                                </p>
                            </div>
                            <Link to="/all-plumbers" className="w-full">
                                <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:translate-y-0 transform hover:-translate-y-0.5 text-sm">
                                    View Plumbers
                                </button>
                            </Link>
                        </div>

                        {/* Cleaning */}
                        <div className="group border border-slate-100 rounded-2xl p-4 text-center shadow-soft hover:shadow-2xl hover:border-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <div>
                                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-5">
                                    <img src={cleaningImg} alt="Cleaning" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                                        <FiDroplet className="text-lg" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">Cleaning</h3>
                                <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed font-medium">
                                    Deep home cleaning, regular housekeeping, and sanitization services.
                                </p>
                            </div>
                            <Link to="/all-cleaning" className="w-full">
                                <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:translate-y-0 transform hover:-translate-y-0.5 text-sm">
                                    View Cleaners
                                </button>
                            </Link>
                        </div>

                        {/* Electrical */}
                        <div className="group border border-slate-100 rounded-2xl p-4 text-center shadow-soft hover:shadow-2xl hover:border-slate-200/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div>
                                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-5">
                                    <img src={electricalImg} alt="Electrical" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                                        <FiZap className="text-lg" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-500 transition-colors duration-300">Electrical</h3>
                                <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed font-medium">
                                    Wiring, troubleshooting, light fixtures installation, and safety upgrades.
                                </p>
                            </div>
                            <Link to="/all-electricians" className="w-full">
                                <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:translate-y-0 transform hover:-translate-y-0.5 text-sm">
                                    View Electricians
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Service Section */}
            <section className="py-16 bg-slate-100/50 border-y border-slate-200/40">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-2.5 animate-fade-in-up">
                        <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Highlight</span>
                        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">Featured Service</h2>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-soft hover:shadow-lg transition-all duration-300 animate-fade-in-up">
                        <div className="lg:w-1/2 space-y-5">
                            <h3 className="text-xl sm:text-2xl font-black text-slate-800">Premium Plumbing Solutions</h3>
                            <p className="text-slate-500 leading-relaxed text-xs sm:text-sm font-medium">
                                Our plumbing experts are available 24/7 to help you resolve plumbing emergencies, regular maintenance, and custom installations. Whether you have leaky pipes, clogged drains, or need brand new faucet fittings, we've got you covered with certified technicians.
                            </p>
                            <Link to="/all-plumbers" className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-700 transition-colors text-xs sm:text-sm">
                                Find a Plumber Now &rarr;
                            </Link>
                        </div>
                        <div className="lg:w-1/2 w-full h-[280px] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                            <img
                                src="./src/assets/hero.jpg"
                                alt="Plumbing Service"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-2.5 animate-fade-in-up">
                        <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Testimonials</span>
                        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">What Our Customers Say</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'John Doe', text: 'Excellent service! The plumber was highly professional, timely, and resolved the issue within 30 minutes.' },
                            { name: 'Jane Smith', text: 'I booked a home cleaning session and the results were spotless. Will definitely book again next week.' },
                            { name: 'Alex Brown', text: 'The electrician was knowledgeable and replaced my switchboard safely. Safe, secure and completely hassle-free.' }
                        ].map((customer, index) => (
                            <div key={index} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 relative animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <FaQuoteLeft className="text-indigo-200/50 text-3xl absolute top-5 right-6" />
                                <p className="text-xs sm:text-sm text-slate-600 italic mb-4 leading-relaxed relative z-10 font-medium">
                                    "{customer.text}"
                                </p>
                                <h4 className="text-base font-bold text-slate-800">{customer.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-750 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)]"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-5">
                    <h2 className="text-2xl sm:text-3.5xl lg:text-4xl font-display font-black tracking-tight">Ready to Get Started?</h2>
                    <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto leading-relaxed">Book a certified local professional today and experience hassle-free home care.</p>
                    <Link
                        to="/"
                        className="bg-white text-indigo-600 hover:bg-slate-50 px-6 py-2.5 rounded-full font-bold inline-block shadow-xl shadow-indigo-950/20 hover:shadow-indigo-950/30 transform hover:-translate-y-0.5 transition-all text-sm"
                    >
                        Explore Services
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-850">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">About Us</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/company-info" className="hover:text-indigo-400 transition-colors">Company Info</Link></li>
                                <li><Link to="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
                                <li><Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">Our Services</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/all-plumbers" className="hover:text-indigo-400 transition-colors">Plumbing</Link></li>
                                <li><Link to="/all-cleaning" className="hover:text-indigo-400 transition-colors">Cleaning</Link></li>
                                <li><Link to="/all-electricians" className="hover:text-indigo-400 transition-colors">Electrical</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">Support</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/faq" className="hover:text-indigo-400 transition-colors">FAQs</Link></li>
                                <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                                <li><Link to="/live-chat" className="hover:text-indigo-400 transition-colors">Live Chat</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6 text-sm tracking-wider uppercase">Follow Us</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link to="/social/facebook" className="hover:text-indigo-400 transition-colors">Facebook</Link></li>
                                <li><Link to="/social/twitter" className="hover:text-indigo-400 transition-colors">Twitter</Link></li>
                                <li><Link to="/social/instagram" className="hover:text-indigo-400 transition-colors">Instagram</Link></li>
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

export default ServicePage;
