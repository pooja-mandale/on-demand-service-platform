import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const agencyApi = createApi({
    reducerPath: "agencyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/agency", credentials: "include" }),
    tagTypes: ["agencyApi"],
    endpoints: (builder) => {
        return {
            getAllAgencyProfessions: builder.query({
                query: () => {
                    return {
                        url: "/get-agency-professional",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["agencyApi"]
            }),
            registerAgency: builder.mutation({
                query: agencyData => {
                    return {
                        url: "/register-agency",
                        method: "POST",
                        body: agencyData
                    }
                },
                invalidatesTags: ["agencyApi"]
            }),
            LoginAgency: builder.mutation({
                query: agencyData => {
                    return {
                        url: "/login-agency",
                        method: "POST",
                        body: agencyData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("agency", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["agencyApi"]
            }),
            LogOutAgency: builder.mutation({
                query: agencyData => {
                    return {
                        url: "/logout-agency",
                        method: "POST",
                        body: agencyData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("agency")
                    return data
                },
                invalidatesTags: ["agencyApi"]
            }),
            addAgencyProffessional: builder.mutation({
                query: agencyData => {
                    return {
                        url: "/add-agency-professional",
                        method: "POST",
                        body: agencyData
                    }
                },
                invalidatesTags: ["agencyApi"]
            }),
            deactiveAgencyProfessional: builder.mutation({
                query: agencyData => {
                    return {
                        url: `/deactive-agency-professional/${agencyData}`,
                        method: "PUT",
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["agencyApi"]
            }),
            activeAgencyProfessional: builder.mutation({
                query: agencyData => {
                    return {
                        url: `/active-agency-professional/${agencyData}`,
                        method: "PUT",
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["agencyApi"]
            }),


        }
    }
})

export const {
    useRegisterAgencyMutation,
    useLoginAgencyMutation,
    useLogOutAgencyMutation,
    useGetAllAgencyProfessionsQuery,
    useAddAgencyProffessionalMutation,
    useUpdateAgencyProfileMutation,
    useActiveAgencyProfessionalMutation,
    useDeactiveAgencyProfessionalMutation
} = agencyApi
