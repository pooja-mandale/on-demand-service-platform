import React from "react";
import { useNavigate } from "react-router-dom";

const DeactivationPage = () => {
    const navigate = useNavigate();

    const handleContactSupport = () => {
        navigate("/support")
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Account Deactivated</h1>
                <p className="text-gray-700 mb-6">
                    Your account has been deactivated by the admin. Please contact support for further assistance.
                </p>
                <button
                    onClick={handleContactSupport}
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default DeactivationPage;
