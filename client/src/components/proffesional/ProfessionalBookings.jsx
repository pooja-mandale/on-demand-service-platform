import React, { useEffect, useState } from 'react';
import {
    useAcceptBookingProfessionalMutation,
    useGetAgencyProfessionalBookingsQuery,
    useRejectBookingProfessionalMutation,
} from '../../redux/apis/bookingApi';
import toast from 'react-hot-toast';
import Loader from '../../share/Loader';

const AgencyProfessionalBookingPanel = () => {
    const [acceptBooking, { isSuccess }] = useAcceptBookingProfessionalMutation();
    const [rejectBooking, { isSuccess: rejectBookingSuccess }] = useRejectBookingProfessionalMutation();
    const { data, isLoading, isError, error } = useGetAgencyProfessionalBookingsQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (data) {
            const bookingsArray = Object.values(data || {});
            setTotalPages(Math.ceil(bookingsArray.length / 2));
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Booking Accepted Successfully');
        }
        if (rejectBookingSuccess) {
            toast.success('Booking Rejected Successfully');
        }
    }, [isSuccess, rejectBookingSuccess]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedBookings = data
        ? Object.values(data || {}).slice((currentPage - 1) * 2, currentPage * 2)
        : [];

    if (isLoading) return <Loader fullScreen={false} text="Loading bookings..." />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Agency Professional Bookings</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Booking ID</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Customer Name</th>
                            <th className="px-4 py-2 border">Customer Email</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedBookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{booking._id}</td>
                                <td className="px-4 py-2 border">{booking.desc}</td>
                                <td className="px-4 py-2 border">
                                    {new Date(booking.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border">
                                    {booking.customerId?.name || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border">
                                    {booking.customerId?.email || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border">
                                    <span
                                        className={`px-2 py-1 rounded-md text-white ${booking.status === 'accepted'
                                            ? 'bg-green-500'
                                            : booking.status === 'rejected'
                                                ? 'bg-red-500'
                                                : 'bg-yellow-500'
                                            }`}
                                    >
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border">
                                    <div className="flex flex-col space-y-2">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => acceptBooking(booking._id)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => rejectBooking(booking._id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {booking.status === 'accept' && (
                                            <>
                                                <button
                                                    disabled
                                                    className="px-4 py-2 bg-green-400 text-white rounded-md cursor-not-allowed"
                                                >
                                                    Accepted
                                                </button>
                                                <button
                                                    onClick={() => rejectBooking(booking._id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Professional accepted the booking.
                                                </p>
                                            </>
                                        )}
                                        {booking.status === 'reject' && (
                                            <p className="text-sm text-red-500 font-bold">
                                                Booking Rejected
                                            </p>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">
                    {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AgencyProfessionalBookingPanel;
