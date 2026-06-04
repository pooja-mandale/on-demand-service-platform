import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const AdminApi = createApi({
    reducerPath: "AdminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL || ""}/api/admin`, credentials: "include" }),
    tagTypes: ["adminApi"],
    endpoints: (builder) => {
        return {

            registerAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/regiter-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                invalidatesTags: ["adminApi"]
            }),
            loginAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/login-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["adminApi"]
            }),
            logOutAdmin: builder.mutation({
                query: adminData => {
                    return {
                        url: "/logout-admin",
                        method: "POST",
                        body: adminData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data
                },
                invalidatesTags: ["adminApi"]
            }),
            getAllCustomers: builder.query({
                query: () => {
                    return {
                        url: "/get-customer",
                        method: "GET"
                    }
                },
                transformResponse: data => {

                    return data.result
                },
                providesTags: ["adminApi"]
            }),
            getAllAgency: builder.query({
                query: () => {
                    return {
                        url: "/get-agency",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["adminApi"]
            }),
            getAllProfessionls: builder.query({
                query: () => {
                    return {
                        url: "/get-professional",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["adminApi"]
            }),
            // getAllAgencyProfessionls: builder.query({
            //     query: () => {
            //         return {
            //             url: "/get-agency-professional",
            //             method: "GET"
            //         }
            //     },
            //     transformResponse: data => data.result,
            //     providesTags: ["adminApi"]
            // }),
            getAdminProfile: builder.query({
                query: () => {
                    return {
                        url: "/admin-profile",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["adminApi"]
            }),

            addProfessional: builder.mutation({
                query: adminData => {
                    return {
                        url: "/add-professional",
                        method: "POST",
                        body: adminData
                    }
                },
                invalidatesTags: ["adminApi"]
            }),
            // deleteCustomer: builder.mutation({
            //     query: id => {
            //         return {
            //             url: `/delete-professional/${id}`,
            //             method: "DELETE",
            //             // body: adminData
            //         }
            //     },
            //     invalidatesTags: ["adminApi"]
            // }),
            activeAccount: builder.mutation({
                query: adminData => ({
                    url: `/active-account/${adminData}`,
                    method: "PUT",
                }),
                transformResponse: data => data.result,
                invalidatesTags: ["adminApi"],
            }),
            deActiveAccount: builder.mutation({
                query: adminData => ({
                    url: `/deactive-account/${adminData}`,
                    method: "PUT",
                }),
                transformResponse: data => data.result,
                invalidatesTags: ["adminApi"],
            }),
            // updateProfileAdmin: builder.mutation({
            //     query: adminData => ({
            //         url: `/deactive-account/${adminData}`,
            //         method: "PUT",
            //     }),
            //     transformResponse: data => data.result,
            //     invalidatesTags: ["adminApi"],
            // }),




        }
    }
})

export const {
    useLoginAdminMutation,
    useLogOutAdminMutation,
    useGetAllAgencyQuery,
    useGetAllCustomersQuery,
    useAddProfessionalMutation,
    useGetAllProfessionlsQuery,
    useActiveAccountMutation,
    useDeActiveAccountMutation,
    useGetAdminProfileQuery,
} = AdminApi
