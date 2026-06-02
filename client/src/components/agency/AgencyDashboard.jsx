import React from "react";

const AgencyDashboard = () => {

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card: Professionals */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Professionals</h2>
                        <p className="text-gray-600">
                            Add, edit, or remove professional service providers for your agency.
                        </p>
                        <button
                            onClick={() => console.log("Navigate to Manage Professionals")}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Manage Professionals
                        </button>
                    </div>

                    {/* Card: Service Requests */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Requests</h2>
                        <p className="text-gray-600">
                            View and respond to customer service requests efficiently.
                        </p>
                        <button
                            onClick={() => console.log("Navigate to Service Requests")}
                            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                        >
                            View Requests
                        </button>
                    </div>

                    {/* Card: Metrics */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Agency Metrics</h2>
                        <p className="text-gray-600">
                            Monitor the performance of your agency with key statistics.
                        </p>
                        <button
                            onClick={() => console.log("Navigate to Metrics")}
                            className="mt-4 w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition"
                        >
                            View Metrics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgencyDashboard;
