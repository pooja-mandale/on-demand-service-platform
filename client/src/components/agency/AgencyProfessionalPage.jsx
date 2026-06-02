import React, { useEffect } from 'react'
import { useGetAllCustomersQuery } from '../../redux/apis/adminApi'
import toast from 'react-hot-toast'

const AgencyProfessionalPage = () => {
    const { data, isSuccess, isError, error, isLoading } = useGetAllCustomersQuery()


    useEffect(() => {
        if (isSuccess) {
            toast.success("customer Get Success")
        }
    }, [isSuccess])
    return <>
        <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Professional List</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search customers..."
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b bg-gray-100">
                        <th className="py-2 px-4 text-gray-600 cursor-pointer">id</th>
                        <th className="py-2 px-4 text-gray-600 cursor-pointer">name</th>
                        <th className="py-2 px-4 text-gray-600 cursor-pointer">email</th>
                        <th className="py-2 px-4 text-gray-600">actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data &&
                        data.map((item, index) => (
                            <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}>
                                <td className="py-2 px-4">{item._id}</td>
                                <td className="py-2 px-4">{item.name}</td>
                                <td className="py-2 px-4">{item.email}</td>
                                <td className="py-2 px-4">
                                    <Link to=""><button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">View</button></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


        </div>

    </>
}

export default AgencyProfessionalPage