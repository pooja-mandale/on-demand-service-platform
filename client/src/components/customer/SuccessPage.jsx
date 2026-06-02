import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4">
            {/* Background blur decoration */}
            <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 text-center">
                {/* Success Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, duration: 0.5 }}
                    className="mb-6 flex justify-center text-emerald-500"
                >
                    <FaCheckCircle className="text-6xl drop-shadow-md" />
                </motion.div>

                {/* Success Message */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-2xl font-display font-black text-slate-900 mb-3.5"
                >
                    Booking Confirmed!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6"
                >
                    Your service has been successfully booked. You can track this booking under your account dashboard. Redirecting to home page shortly...
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    onClick={() => navigate('/')}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-500/15 text-sm"
                >
                    Return to Homepage
                </motion.button>
            </div>
        </div>
    );
};

export default SuccessPage;
