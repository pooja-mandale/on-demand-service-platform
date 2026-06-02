import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useActiveAgencyProfessionalMutation, useDeactiveAgencyProfessionalMutation, useGetAllAgencyProfessionsQuery } from '../../redux/apis/agencyApi';
import toast from 'react-hot-toast';

const AllAgencyProfessionals = () => {
    const [activeAccount, { isSuccess: activeAccountisSuccess }] = useActiveAgencyProfessionalMutation();
    const [deActiveAccount, { isSuccess: deActiveAccountisSuccess, isError: deActiveAccountisError }] = useDeactiveAgencyProfessionalMutation();
    const { data, isSuccess, isError, isLoading, error } = useGetAllAgencyProfessionsQuery();

    useEffect(() => {
        if (activeAccountisSuccess) {
            toast.success("Account activated successfully.");
        }
    }, [activeAccountisSuccess]);

    useEffect(() => {
        if (deActiveAccountisSuccess) {
            toast.error("Account deactivated successfully.");
        }
    }, [deActiveAccountisSuccess]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Error: {error?.data?.message || 'Something went wrong'}
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="bg-white shadow-md rounded-md p-4 overflow-x-auto">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Professional List</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-100 text-sm md:text-base">
                            <th className="px-2 py-1">ID</th>
                            <th className="px-2 py-1">Name</th>
                            <th className="px-2 py-1">Email</th>
                            <th className="px-2 py-1">Phone</th>
                            <th className="px-2 py-1">Address</th>
                            <th className="px-2 py-1">Categories</th>
                            <th className="px-2 py-1">Experience</th>
                            <th className="px-2 py-1">Image</th>
                            <th className="px-2 py-1">Price</th>
                            <th className="px-2 py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isSuccess && data?.length > 0 ? (
                            data.map((item) => (
                                <tr key={item._id} className="border-b">
                                    <td className="px-2 py-1 text-sm">{item._id}</td>
                                    <td className="px-2 py-1 text-sm">{item.name}</td>
                                    <td className="px-2 py-1 text-sm">{item.email}</td>
                                    <td className="px-2 py-1 text-sm">{item.phone}</td>
                                    <td className="px-2 py-1 text-sm">{item.address}</td>
                                    <td className="px-2 py-1 text-sm">{item.categories}</td>
                                    <td className="px-2 py-1 text-sm">{item.experience}</td>
                                    <td className="px-2 py-1 text-sm">
                                        <img
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={item.image}
                                            alt={`${item.name}'s profile`}
                                        />
                                    </td>
                                    <td className="px-2 py-1 text-sm">{item.price}</td>
                                    <td className="px-2 py-1 text-sm">
                                        <Link to="/agency-professional/agency-professional-profile">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 text-xs md:text-sm">
                                                View
                                            </button>
                                        </Link>
                                        {item.isActiveAccount ? <>
                                            <button
                                                onClick={() => deActiveAccount(item._id)}
                                                className="bg-red-700 text-white px-2 py-1 rounded-md text-xs md:text-sm"
                                            >
                                                Deactivate
                                            </button>

                                        </> : <>
                                            <button
                                                onClick={() => activeAccount(item._id)}
                                                className="bg-green-500 text-white px-2 py-1 rounded-md text-xs md:text-sm"
                                            >
                                                Activate
                                            </button>
                                            <br />
                                            <span className="text-red-500 text-sm">Deactivated by the admin</span>

                                        </>
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center text-sm py-4">
                                    No active professionals found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAgencyProfessionals;
