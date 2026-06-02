import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookingServiceMutation } from '../../redux/apis/bookingApi';
import { FaCalendarAlt, FaClock, FaCommentDots, FaBriefcase } from 'react-icons/fa';

const ServiceBookingPage = () => {
    const [bookingService, { isSuccess, isError, isLoading }] = useBookingServiceMutation();
    const navigate = useNavigate();
    const { id } = useParams();
    const x = id.split("-");

    const formik = useFormik({
        initialValues: {
            desc: '',
            time: '',
            date: '',
        },
        validationSchema: yup.object({
            time: yup.string().required('Enter the time'),
            desc: yup.string().required('Enter a description of the issue'),
            date: yup.date().required('Select the date').nullable(),
        }),
        onSubmit: (values, { resetForm }) => {
            if (x[1] === "Agency") {
                bookingService({ ...values, agencyProfessionalId: x[0] })
            } else {
                bookingService({ ...values, professionalId: x[0] })
            }
            resetForm();
        },
    });

    const inputClasses = (key) =>
        clsx(
            'w-full px-4 py-2.5 mt-2 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-sm',
            {
                'border-emerald-500 focus:ring-emerald-500/10 focus:border-emerald-500': formik.touched[key] && !formik.errors[key], // Valid state
                'border-rose-500 focus:ring-rose-500/10 focus:border-rose-500': formik.touched[key] && formik.errors[key], // Invalid state
                'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-600': !formik.touched[key] || (!formik.errors[key] && !formik.touched[key]),
            }
        );

    useEffect(() => {
        if (isSuccess) {
            toast.success("Service Booked Successfully!");
            navigate("/success");
        }
    }, [isSuccess, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4 pt-20 pb-12">
            {/* Background blur accents */}
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50">
                <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-2xs font-bold bg-indigo-50 text-indigo-700 mb-2.5 border border-indigo-100/50">
                        <FaBriefcase className="text-3xs" /> Booking Portal
                    </span>
                    <h2 className="text-2xl font-display font-black text-slate-900">Schedule Service</h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">Provide task details, select date and time to confirm your slot.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Description input */}
                    <div>
                        <label htmlFor="desc" className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <FaCommentDots className="text-indigo-500" />
                            <span>Description of Issue</span>
                        </label>
                        <textarea
                            {...formik.getFieldProps('desc')}
                            id="desc"
                            placeholder="Please describe the work required in detail..."
                            className={inputClasses('desc')}
                            rows="4"
                        />
                        {formik.touched.desc && formik.errors.desc && (
                            <p className="text-rose-500 text-xs mt-1.5 font-medium">{formik.errors.desc}</p>
                        )}
                    </div>

                    {/* Date and Time inputs row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Date input */}
                        <div>
                            <label htmlFor="date" className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <FaCalendarAlt className="text-indigo-500" />
                                <span>Preferred Date</span>
                            </label>
                            <input
                                min={new Date().toISOString().split('T')[0]}
                                {...formik.getFieldProps('date')}
                                type="date"
                                id="date"
                                className={inputClasses('date')}
                                required
                            />
                            {formik.touched.date && formik.errors.date && (
                                <p className="text-rose-500 text-xs mt-1.5 font-medium">{formik.errors.date}</p>
                            )}
                        </div>

                        {/* Time input */}
                        <div>
                            <label htmlFor="time" className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <FaClock className="text-indigo-500" />
                                <span>Preferred Time</span>
                            </label>
                            <input
                                {...formik.getFieldProps('time')}
                                type="time"
                                id="time"
                                className={inputClasses('time')}
                                required
                            />
                            {formik.touched.time && formik.errors.time && (
                                <p className="text-rose-500 text-xs mt-1.5 font-medium">{formik.errors.time}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 text-white mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Confirming slot...
                            </div>
                        ) : (
                            "Request Booking"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ServiceBookingPage;
