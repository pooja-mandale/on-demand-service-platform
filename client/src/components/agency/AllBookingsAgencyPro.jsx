import React, { useState } from 'react';
import { useGetAllAgencyprofessionalBookingsQuery } from '../../redux/apis/bookingApi';

const AgencyProfessionalBooking = () => {
    const { data, isLoading, isError, error } = useGetAllAgencyprofessionalBookingsQuery();

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust this as needed

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                Error: {error?.data?.message || 'Something went wrong'}
            </div>
        );
    }

    // Pagination Logic
    const totalItems = data?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get the current page data slice
    const currentPageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Professional Bookings</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-100">
                                <th className="py-2 px-4 text-gray-600">Customer Name</th>
                                <th className="py-2 px-4 text-gray-600">Customer Email</th>
                                <th className="py-2 px-4 text-gray-600">Profession Name</th>
                                <th className="py-2 px-4 text-gray-600">Profession Email</th>
                                <th className="py-2 px-4 text-gray-600">Date</th>
                                <th className="py-2 px-4 text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData?.length > 0 ? (
                                currentPageData.map((booking, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200`}
                                    >
                                        <td className="py-2 px-4 text-sm">{booking.customerId?.name || 'N/A'}</td>
                                        <td className="py-2 px-4 text-sm">{booking.customerId?.email || 'N/A'}</td>
                                        <td className="py-2 px-4 text-sm">{booking.agencyProfessionalId?.name || 'N/A'}</td>
                                        <td className="py-2 px-4 text-sm">{booking.agencyProfessionalId?.email || 'N/A'}</td>
                                        <td className="py-2 px-4 text-sm">{new Date(booking.date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 text-sm">
                                            {
                                                booking.status === "accept"
                                                    ? "Accepted"
                                                    : booking.status === "pending"
                                                        ? "Pending"
                                                        : "Rejected"
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-gray-500">
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgencyProfessionalBooking;
