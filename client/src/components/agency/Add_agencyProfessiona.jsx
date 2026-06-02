import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useAddAgencyProffessionalMutation } from "../../redux/apis/agencyApi";

const Add_agencyProfessional = () => {
    const [preview, setPreview] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [addAgencyProfessional, { isSuccess, isError, isLoading, error }] = useAddAgencyProffessionalMutation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            categories: "",
            experience: "",
            price: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter your name"),
            email: yup
                .string()
                .email("Enter a valid email")
                .required("Enter your email"),
            categories: yup
                .string()
                .required("Enter your email"),
            phone: yup
                .string()
                .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
                .required("Enter your phone number"),
            address: yup.string().required("Enter your address"),
            experience: yup
                .number()
                .min(0, "Experience must be a non-negative number")
                .required("Enter your experience"),
            price: yup
                .number()
                .min(0, "Price must be a positive number")
                .required("Enter your price"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("image", selectedImage);
            Object.entries(values).forEach(([key, value]) => {
                formData.append(
                    key, values[key]

                );
            });

            try {
                await addAgencyProfessional(formData);
                resetForm();
            } catch (err) {
                console.error("Registration error:", err);
            }
        },
    });

    // Handle success or error
    useEffect(() => {
        if (isSuccess) {
            toast.success("Professional registered successfully!");
            navigate("/agency/agency-dashboard")
        }
    }, [isSuccess, isError, error, navigate])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result)
            reader.readAsDataURL(file)
        }
    };

    const inputClasses = (key) =>
        clsx(
            "w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2",
            formik.touched[key] && formik.errors[key]
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
        );

    if (isLoading) {
        return (
            <div>
                Processing, please wait...
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    +Add Professional
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium">
                            Name
                        </label>
                        <input
                            {...formik.getFieldProps("name")}
                            type="text"
                            id="name"
                            className={inputClasses("name")}
                            placeholder="Enter your name"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-red-500 text-sm">{formik.errors.name}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            {...formik.getFieldProps("email")}
                            type="email"
                            id="email"
                            className={inputClasses("email")}
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500 text-sm">{formik.errors.email}</span>
                        )}
                    </div>
                    {/* Phone */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-medium">
                            Phone
                        </label>
                        <input
                            {...formik.getFieldProps("phone")}
                            type="text"
                            id="phone"
                            className={inputClasses("phone")}
                            placeholder="Enter your phone number"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <span className="text-red-500 text-sm">{formik.errors.phone}</span>
                        )}
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 font-medium">
                            Address
                        </label>
                        <input
                            {...formik.getFieldProps("address")}
                            type="text"
                            id="address"
                            className={inputClasses("address")}
                            placeholder="Enter your address"
                        />
                        {formik.touched.address && formik.errors.address && (
                            <span className="text-red-500 text-sm">{formik.errors.address}</span>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="mb-4">
                        <label htmlFor="categories" className="block text-gray-700 font-medium">
                            Categories
                        </label>
                        <select
                            id="categories"
                            value={formik.values.categories}
                            {...formik.getFieldProps("categories")}
                            className={clsx(
                                "w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                                { "border-red-500": formik.touched.categories && formik.errors.categories }
                            )}
                        >
                            <option value="plumber">Plumber</option>
                            <option value="electrician">Electrician</option>
                            <option value="cleaner">Cleaner</option>
                        </select>
                        {formik.touched.categories && formik.errors.categories && (
                            <span className="text-red-500 text-sm">{formik.errors.categories}</span>
                        )}
                    </div>

                    {/* Experience */}
                    <div className="mb-4">
                        <label htmlFor="experience" className="block text-gray-700 font-medium">
                            Experience (in years)
                        </label>
                        <input
                            {...formik.getFieldProps("experience")}
                            type="number"
                            id="experience"
                            className={inputClasses("experience")}
                            placeholder="Enter your experience"
                        />
                        {formik.touched.experience && formik.errors.experience && (
                            <span className="text-red-500 text-sm">{formik.errors.experience}</span>
                        )}
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-medium">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className={inputClasses("image")}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {preview && <img src={preview} alt="Preview" className="mt-2 h-20" />}
                        {formik.touched.image && formik.errors.image && (
                            <span className="text-red-500 text-sm">{formik.errors.image}</span>
                        )}
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-medium">
                            Price (in $)
                        </label>
                        <input
                            {...formik.getFieldProps("price")}
                            type="number"
                            id="price"
                            className={inputClasses("price")}
                            placeholder="Enter your price"
                        />
                        {formik.touched.price && formik.errors.price && (
                            <span className="text-red-500 text-sm">{formik.errors.price}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={clsx(
                            "w-full py-3 text-white font-semibold rounded-lg transition duration-200",
                            {
                                "bg-blue-500 hover:bg-blue-600": !formik.isSubmitting,
                                "bg-gray-400 cursor-not-allowed": formik.isSubmitting,
                            }
                        )}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Registering..." : "+ Add"}
                    </button>
                </form>
            </div>
        </div>
    );

}

export default Add_agencyProfessional;




