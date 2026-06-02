import React from "react";

const AgencyProfessionalDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Dashboard Container */}
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Agency Professional Dashboard
                </h1>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="p-6 bg-blue-500 text-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Total Services Completed</h2>
                        <p className="text-4xl font-bold">120</p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 bg-green-500 text-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Earnings</h2>
                        <p className="text-4xl font-bold">$3,500</p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 bg-yellow-500 text-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Pending Requests</h2>
                        <p className="text-4xl font-bold">15</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Recent Service Requests
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-md">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 text-left">Request ID</th>
                                    <th className="py-2 px-4 text-left">Service</th>
                                    <th className="py-2 px-4 text-left">Customer</th>
                                    <th className="py-2 px-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table Row 1 */}
                                <tr className="border-b border-gray-300 hover:bg-gray-100">
                                    <td className="py-2 px-4">#REQ123</td>
                                    <td className="py-2 px-4">Plumbing</td>
                                    <td className="py-2 px-4">John Doe</td>
                                    <td className="py-2 px-4 text-blue-500 font-semibold">Pending</td>
                                </tr>
                                {/* Table Row 2 */}
                                <tr className="border-b border-gray-300 hover:bg-gray-100">
                                    <td className="py-2 px-4">#REQ124</td>
                                    <td className="py-2 px-4">Cleaning</td>
                                    <td className="py-2 px-4">Jane Smith</td>
                                    <td className="py-2 px-4 text-green-500 font-semibold">Completed</td>
                                </tr>
                                {/* Table Row 3 */}
                                <tr className="hover:bg-gray-100">
                                    <td className="py-2 px-4">#REQ125</td>
                                    <td className="py-2 px-4">Electrical Repair</td>
                                    <td className="py-2 px-4">Mike Johnson</td>
                                    <td className="py-2 px-4 text-yellow-500 font-semibold">In Progress</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgencyProfessionalDashboard;
