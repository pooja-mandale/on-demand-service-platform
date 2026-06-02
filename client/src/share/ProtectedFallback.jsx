import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiArrowRight } from 'react-icons/fi';

const ProtectedFallback = ({ to, title = "Access Denied", message = "You are not logged in. Please log in to access this page." }) => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full bg-slate-50/50 p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 text-center shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-300/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-300/10 rounded-full blur-2xl"></div>

        {/* Lock Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-indigo-600 mb-6 shadow-inner animate-float-medium">
          <FiLock className="text-2xl" />
        </div>

        {/* Text */}
        <h2 className="text-xl sm:text-2xl font-display font-black text-slate-800 tracking-tight mb-3">
          {title}
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto mb-8">
          {message}
        </p>

        {/* Action Button */}
        <Link
          to={to}
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold rounded-2xl transition-all shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
        >
          <span>Go to Login</span>
          <FiArrowRight className="text-base" />
        </Link>
      </div>
    </div>
  );
};

export default ProtectedFallback;
