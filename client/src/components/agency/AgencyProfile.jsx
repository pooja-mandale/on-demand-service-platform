import { useSelector } from "react-redux";
import { useLogOutAgencyMutation } from "../../redux/apis/agencyApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AgencyProfile = () => {
    const navigate = useNavigate()
    const [logOutAgency, { isSuccess, isError, isLoading, error }] = useLogOutAgencyMutation()
    const { agency } = useSelector((state) => state.auth);


    useEffect(() => {
        if (isSuccess) {
            toast.success("agency LogOut Success")
            navigate("/")
        }
    }, [isSuccess])
    if (!agency) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center text-gray-500">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    Agency Profile
                </h1>
                <div className="text-center">
                    <img
                        src={"https://via.placeholder.com/150"}
                        alt="Customer Avatar"
                        className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300"
                    />
                </div>
                <div className="text-gray-700 space-y-4">
                    <p>
                        <strong>Name:</strong> {agency.name || "Not Provided"}
                    </p>
                    <p>
                        <strong>Email:</strong> {agency.email || "Not Provided"}
                    </p>
                    <p>
                        <strong>Phone:</strong> {agency.phone || "Not Provided"}
                    </p>
                    <p>
                        <strong>Address:</strong> {agency.address || "Not Provided"}
                    </p>

                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                    <button className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                        Edit Profile
                    </button>
                    <button onClick={logOutAgency} className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgencyProfile;
