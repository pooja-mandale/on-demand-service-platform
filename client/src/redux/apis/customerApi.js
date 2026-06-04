import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL || ""}/api/customer`, credentials: "include" }),
    tagTypes: ["customerApi"],
    endpoints: (builder) => {
        return {
            getprofile: builder.query({
                query: () => {
                    return {
                        url: "/fetchprofile",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["customerApi"]
            }),
            getAllPlumbers: builder.query({
                query: () => {
                    return {
                        url: "/get-plumbers",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["customerApi"]
            }),
            getAllCleaners: builder.query({
                query: () => {
                    return {
                        url: "/get-cleaners",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["customerApi"]
            }),
            getAllElectricians: builder.query({
                query: () => {
                    return {
                        url: "/get-electricians",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["customerApi"]
            }),

            getAllAgencyPlumbers: builder.query({
                query: () => {
                    return {
                        url: "/get-agencyplumbers",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["customerApi"]
            }),
            getAllAgencyCleaners: builder.query({
                query: () => {
                    return {
                        url: "/get-agencycleaners",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["customerApi"]
            }),
            getAllAgencyElectricians: builder.query({
                query: () => {
                    return {
                        url: "/get-agencyelectricians",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["customerApi"]
            }),


            registerCustomer: builder.mutation({
                query: customerData => {
                    return {
                        url: "/register-customer",
                        method: "POST",
                        body: customerData
                    }
                },
                invalidatesTags: ["customerApi"]
            }),
            loginCustomer: builder.mutation({
                query: customerData => {
                    return {
                        url: "/login-customer",
                        method: "POST",
                        body: customerData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("customer", JSON.stringify(data.result))
                    return data.result
                },
                providesTags: ["customerApi"],
                invalidatesTags: ["customerApi"]
            }),
            logOutCustomer: builder.mutation({
                query: customerData => {
                    return {
                        url: "/logout-customer",
                        method: "POST",
                        body: customerData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("customer")
                    return data
                },
                invalidatesTags: ["customerApi"]
            }),

            updateCustomeryProfile: builder.mutation({
                query: ({ id, formData }) => {
                    return {
                        url: `/update-profile-customer/${id}`,
                        method: "PUT",
                        body: formData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("customer", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["customerApi"]
            }),

        }
    }
})

export const {
    useRegisterCustomerMutation,
    useLoginCustomerMutation,
    useLogOutCustomerMutation,
    useGetAllCleanersQuery,
    useGetAllElectriciansQuery,
    useGetAllPlumbersQuery,
    useUpdateCustomeryProfileMutation,
    useGetprofileQuery,
    useGetAllAgencyPlumbersQuery,
    useGetAllAgencyElectriciansQuery,
    useGetAllAgencyCleanersQuery,


} = customerApi
