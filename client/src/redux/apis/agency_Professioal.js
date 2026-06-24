import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const agency_professionalApi = createApi({
    reducerPath: "agency_professionalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL || ""}/api/agency-professional`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const agency_professional = JSON.parse(localStorage.getItem("agency_professional") || "{}");
            if (agency_professional && agency_professional.token) {
                headers.set("authorization", `Bearer ${agency_professional.token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["agency_professionalApi"],
    endpoints: (builder) => {
        return {
            getAgencyProfessionalpro: builder.query({
                query: () => {
                    return {
                        url: "/get-agency-professional-profile",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["agency_professionalApi"]
            }),
            loginAgencyProfessional: builder.mutation({
                query: agency_ProfessionalData => {
                    return {
                        url: "/login-agency-professional",
                        method: "POST",
                        body: agency_ProfessionalData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("agency_professional", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["agency_professionalApi"]
            }),
            logOutAgencyProfessional: builder.mutation({
                query: agency_ProfessionalData => {
                    return {
                        url: "/logout-agency-professional",
                        method: "POST",
                        body: agency_ProfessionalData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("agency_professional")
                    return data
                },
                invalidatesTags: ["agency_professionalApi"]
            }),
            updateAgencyProfessionalyProfile: builder.mutation({
                query: professionalData => {
                    return {
                        url: `/update-profile-agency-profssional/${professionalData._id}`,
                        method: "PUT",
                        body: professionalData.fd
                    }
                },
                invalidatesTags: ["agency_professionalApi"]
            }),


        }
    }
})

export const {
    useLoginAgencyProfessionalMutation,
    useLogOutAgencyProfessionalMutation,
    useUpdateAgencyProfessionalyProfileMutation,
    useGetAgencyProfessionalproQuery
} = agency_professionalApi
