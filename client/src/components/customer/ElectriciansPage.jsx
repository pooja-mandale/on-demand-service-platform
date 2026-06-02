import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    useGetAllAgencyElectriciansQuery,
    useGetAllElectriciansQuery,
} from '../../redux/apis/customerApi';
import { Link } from 'react-router-dom';
import { FiUser, FiAward, FiDollarSign, FiPhone, FiBriefcase, FiTool, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Loader from '../../share/Loader';

const ElectriciansPage = () => {
    const { agency } = useSelector((state) => state.auth);
    const {
        data: normalElectricians,
        isSuccess: isNormalSuccess,
        isLoading: loadingNormal,
        isError: errorNormal,
    } = useGetAllElectriciansQuery();

    const {
        data: agencyElectricians,
        isSuccess: isAgencySuccess,
        isLoading: loadingAgency,
        isError: errorAgency,
    } = useGetAllAgencyElectriciansQuery();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6 // Number of electricians per page

    if (loadingNormal || loadingAgency) {
        return <Loader text="Finding available electricians..." />;
    }

    // Combined Error State
    if (errorNormal || errorAgency) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 text-center max-w-md">
                    <p className="text-lg font-bold text-red-500 mb-2">Error loading profiles</p>
                    <p className="text-slate-500 text-sm">
                        {errorNormal?.data?.message || errorAgency?.data?.message || 'Something went wrong'}
                    </p>
                </div>
            </div>
        );
    }

    // Combine and add type fields to both datasets
    const combinedData = [
        ...(isNormalSuccess ? normalElectricians.map((item) => ({ ...item, type: 'Normal' })) : []),
        ...(isAgencySuccess ? agencyElectricians.map((item) => ({ ...item, type: 'Agency' })) : []),
    ];

    // Calculate total pages
    const totalPages = Math.ceil(combinedData.length / itemsPerPage);

    // Slice the data for the current page
    const paginatedData = combinedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'E';
    };

    return (
        <div className="bg-slate-50/50 min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-fade-in">
            <div className="text-center mb-12 space-y-3 animate-fade-in-up">
                <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">Electrical Experts</span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900">Professional Electricians</h2>
                <p className="text-slate-500 max-w-2xl mx-auto font-medium">Book reliable independent electricians or agency professionals in just a few clicks.</p>
            </div>

            {/* Grid layout of cards */}
            {paginatedData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedData.map((item, index) => (
                        <div 
                            key={item._id} 
                            className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft hover:shadow-2xl hover:border-slate-200/50 hover:-translate-y-1.5 transform transition-all duration-300 flex flex-col justify-between animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div>
                                {/* Header (Avatar, Type badge, Rating) */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-50 shadow-inner bg-gradient-to-tr from-indigo-50 to-indigo-100/50 flex items-center justify-center flex-shrink-0 text-indigo-600 font-display font-black text-xl">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <span className="flex w-full h-full items-center justify-center" style={{ display: item.image ? 'none' : 'flex' }}>
                                                {getInitials(item.name)}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-slate-800 text-lg leading-tight">{item.name}</h3>
                                            <p className="text-xs text-indigo-600 font-bold flex items-center gap-1 mt-1">
                                                <FiTool className="text-2xs" /> {item.categories || 'Electrician'}
                                            </p>
                                        </div>
                                    </div>
                                    <span 
                                        className={`text-2xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                                            item.type === 'Agency' 
                                                ? 'bg-violet-50 text-violet-600 border border-violet-100' 
                                                : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                        }`}
                                    >
                                        {item.type}
                                    </span>
                                </div>

                                {/* Body Information */}
                                <div className="space-y-3.5 border-t border-b border-slate-50 py-5 my-5 text-sm text-slate-600">
                                    {item.type === 'Agency' && (
                                        <div className="flex items-center gap-2.5">
                                            <FiBriefcase className="text-slate-400 text-base w-4" />
                                            <span>Agency: <strong className="text-slate-800 font-bold">{agency?.name || 'Vetted Agency'}</strong></span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2.5">
                                        <FiAward className="text-slate-400 text-base w-4" />
                                        <span>Experience: <strong className="text-slate-800 font-bold">{item.experience} Years</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <FiPhone className="text-slate-400 text-base w-4" />
                                        <span>Phone: <strong className="text-slate-850 font-mono font-semibold">{item.phone}</strong></span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer / Booking rate & CTA */}
                            <div className="flex items-center justify-between mt-2 pt-2">
                                <div>
                                    <span className="text-slate-400 text-xs block font-medium">Rate / Cost</span>
                                    <div className="flex items-center text-slate-900 font-black text-xl">
                                        <FiDollarSign className="text-indigo-600 text-sm -mr-0.5" />
                                        <span>{item.price}</span>
                                        <span className="text-slate-400 text-xs font-normal ml-0.5">/hr</span>
                                    </div>
                                </div>
                                <Link to={`/booking/${item._id}-${item.type}`}>
                                    <button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold px-6 py-2.5 rounded-2xl transition-all shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:translate-y-0 transform hover:-translate-y-0.5">
                                        Book Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-soft max-w-xl mx-auto">
                    <p className="text-lg font-bold text-slate-700 mb-2">No Electricians Found</p>
                    <p className="text-slate-450 text-sm">We currently do not have any registered electricians in this category.</p>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-3">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-3 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <FiChevronLeft className="text-sm" />
                    </button>
                    <span className="px-5 py-2 bg-indigo-50/80 border border-indigo-100/50 rounded-2xl text-indigo-700 font-bold text-sm">
                        {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-3 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <FiChevronRight className="text-sm" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ElectriciansPage;
