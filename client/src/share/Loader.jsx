import React from 'react';
import logo from '../assets/logo.png';

const Loader = ({ fullScreen = true, text = "Loading quality care..." }) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-md"
    : "w-full min-h-[350px] flex flex-col items-center justify-center p-6 bg-white/30 backdrop-blur-sm rounded-2xl border border-slate-100/50 shadow-soft";

  return (
    <div className={containerClasses}>
      <div className="relative flex flex-col items-center p-8 max-w-sm rounded-3xl bg-white/60 border border-white/80 shadow-xl backdrop-blur-md animate-fade-in">
        {/* Glow effect */}
        {fullScreen && (
          <>
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </>
        )}

        {/* Circular Spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600 animate-spin" style={{ animationDuration: '0.8s' }}></div>
          <div className="absolute inset-1.5 rounded-full border border-indigo-100 animate-ping opacity-35" style={{ animationDuration: '2s' }}></div>

          {/* Logo Center */}
          <div className="relative w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
            <img 
              src={logo} 
              alt="OnDemand Logo" 
              className="w-9 h-9 object-contain animate-float-medium"
            />
          </div>
        </div>

        {/* Brand */}
        <h2 className="mt-5 text-lg font-bold tracking-tight text-slate-800 font-display flex items-center gap-1">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">OnDemand</span>
          <span className="text-slate-400 font-medium text-sm">Services</span>
        </h2>
        
        <p className="mt-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-widest animate-pulse">
          {text}
        </p>

        {/* Progress bar */}
        <div className="w-40 h-1 bg-slate-100 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full w-full animate-loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
