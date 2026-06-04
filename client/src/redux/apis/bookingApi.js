import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL || ""}/api/booking`, credentials: "include" }),
    tagTypes: ["bookingApi"],
    endpoints: (builder) => {
        return {
            getAllCustomerBooking: builder.query({
                query: () => ({
                    url: "/customer-bookings",
                    method: "GET",
                }),
                transformResponse: (data) => data.result,
                providesTags: ["bookingApi"],
            }),
            // admin
            getAllprofessionalBookings: builder.query({
                query: () => ({
                    url: "/professional-bookings",
                    method: "GET",
                }),
                transformResponse: (data) => data.result,
                providesTags: ["bookingApi"],
            }),
            // agencyAdmin
            getAllAgencyprofessionalBookings: builder.query({
                query: () => ({
                    url: "/agencyprofessional-bookings",
                    method: "GET",
                }),
                transformResponse: (data) => data.result,
                providesTags: ["bookingApi"],
            }),
            // professional
            getProfessionalBookings: builder.query({
                query: () => ({
                    url: "/pro-booking",
                    method: "GET",
                }),
                transformResponse: (data) => data.result,
                providesTags: ["bookingApi"],
            }),
            getAgencyProfessionalBookings: builder.query({
                query: () => ({
                    url: "/agencypro-booking",
                    method: "GET",
                }),
                transformResponse: (data) => data.result,
                providesTags: ["bookingApi"],
            }),
            bookingService: builder.mutation({
                query: bookingData => {
                    return {
                        url: "/booking-service",
                        method: "POST",
                        body: bookingData
                    }
                },

                invalidatesTags: ["bookingApi"]
            }),
            acceptBookingProfessional: builder.mutation({
                query: bookingData => {
                    return {
                        url: `/accept-bookings/${bookingData}`,
                        method: "PUT",
                        body: bookingData
                    }
                },

                invalidatesTags: ["bookingApi"]
            }),
            rejectBookingProfessional: builder.mutation({
                query: bookingData => {
                    return {
                        url: `/reject-bookings/${bookingData}`,
                        method: "PUT",
                        body: bookingData
                    }
                },

                invalidatesTags: ["bookingApi"]
            }),
            cancelBookingProfessional: builder.mutation({
                query: bookingData => {
                    return {
                        url: `/cancel-bookings/${bookingData}`,
                        method: "PUT",
                        body: bookingData
                    }
                },

                invalidatesTags: ["bookingApi"]
            }),

        }
    }
})

export const {
    useGetAllCustomerBookingQuery,
    useBookingServiceMutation,
    useGetAllprofessionalBookingsQuery,
    useGetProfessionalBookingsQuery,
    useGetAllAgencyprofessionalBookingsQuery,
    useGetAgencyProfessionalBookingsQuery,
    useAcceptBookingProfessionalMutation,
    useRejectBookingProfessionalMutation
} = bookingApi
