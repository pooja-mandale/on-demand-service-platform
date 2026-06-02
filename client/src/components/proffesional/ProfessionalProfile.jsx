import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    useGetProfessionalProfileQuery,
    useLogOutProfessionalMutation,
    useUpdateProfessionalProfileMutation,
} from "../../redux/apis/professionalApi";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../share/Loader";

const ProfessionalProfile = () => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [preview, setPreview] = useState(null);
    const [logOutProfessional, { iSuccess: logOutSuccess }] = useLogOutProfessionalMutation()
    const [editProfile, { isSuccess, isLoading: editProfileLoding }] = useUpdateProfessionalProfileMutation();
    const { data: professionalData, isLoading, isError, refetch } = useGetProfessionalProfileQuery();

    const formik = useFormik({
        initialValues: {
            name: selectedProfessional?.name || "",
            email: selectedProfessional?.email || "",
            phone: selectedProfessional?.phone || "",
            address: selectedProfessional?.address || "",
            categories: selectedProfessional?.categories || "",
            experience: selectedProfessional?.experience || 0,
            image: selectedProfessional?.image || "",
            price: selectedProfessional?.price || 0,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
            address: Yup.string(),
            categories: Yup.string().required("Category is required"),
            experience: Yup.number().min(0, "Experience cannot be negative").required("Experience is required"),
            price: Yup.number().min(0, "Price cannot be negative").required("Price is required"),
        }),
        onSubmit: async (values) => {
            const updatedData = { ...values };
            if (preview) {
                updatedData.image = preview;
            }
            try {
                const fd = new FormData()
                for (const key in updatedData) {
                    fd.append(key, updatedData[key])
                }
                const result = await editProfile({ fd, _id: selectedProfessional?._id }).unwrap()
                setSelectedProfessional(result)
                closeModal()
            } catch (error) {
                console.error("Error updating profile:", error)
                toast.error("Failed to update profile. Please try again.")
            }
        },
    });
    useEffect(() => {
        if (isSuccess) {
            toast.success("profile Update Success")
            refetch();
        }
    }, [isSuccess, refetch])
    useEffect(() => {
        if (logOutSuccess) {
            navigate("/")
            toast.success("profile LogOut Success")
        }
    }, [logOutSuccess])

    const openModal = (professional) => {
        setSelectedProfessional(professional);
        setPreview() // Reset preview when opening the modal
        setIsModalOpen(true)
    };

    const closeModal = () => {
        setSelectedProfessional()
        setPreview()
        setIsModalOpen(false)
    };

    if (isLoading) return <Loader fullScreen={false} text="Loading profile..." />;
    if (isError) return <p>Something went wrong. Please try again later.</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Professional Profiles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionalData && (
                    <div key={professionalData._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src={professionalData?.image}
                            alt={`${professionalData.name}'s profile`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{professionalData?.name}</h3>
                            <p className="text-gray-600">Email: {professionalData?.email}</p>
                            <p className="text-gray-600">Phone: {professionalData?.phone}</p>
                            <p className="text-gray-600">Category: {professionalData?.categories}</p>
                            <p className="text-gray-600">Experience: {professionalData?.experience} years</p>
                            <p className="text-gray-600">Price: ₹{professionalData?.price}</p>
                            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                                <button
                                    onClick={() => openModal(professionalData)}
                                    className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={() => logOutProfessional()}
                                    className="w-full sm:w-auto bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                                >
                                    Logout
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for Editing Profile */}
            <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
                        <Dialog.Title className="text-lg font-semibold mb-4">Edit Profile</Dialog.Title>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {["name", "email", "phone", "address", "categories", "experience", "price"].map((field) => (
                                <div key={field}>
                                    <label htmlFor={field} className="block font-medium text-gray-700 capitalize">
                                        {field}
                                    </label>
                                    <input
                                        id={field}
                                        name={field}
                                        type={field === "experience" || field === "price" ? "number" : "text"}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values[field]}
                                    />
                                    {formik.touched[field] && formik.errors[field] && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
                                    )}
                                </div>
                            ))}
                            {/* Image Upload */}
                            <div>
                                <label className="block font-medium text-gray-700">Image</label>
                                {preview ? (
                                    <div className="mt-2">
                                        <img src={preview} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
                                    </div>
                                ) : (
                                    selectedProfessional?.image && (
                                        <div className="mt-2">
                                            <img
                                                src={selectedProfessional.image}
                                                alt="Current"
                                                className="h-32 w-32 object-cover rounded-md"
                                            />
                                        </div>
                                    )
                                )}
                                <input
                                    type="file"
                                    className="mt-2 block w-full text-sm text-gray-600"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                            formik.setFieldValue("image", file);
                                        }
                                    }}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>

        </div>
    );
};

export default ProfessionalProfile;
