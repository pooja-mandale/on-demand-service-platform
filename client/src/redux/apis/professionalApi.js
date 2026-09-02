import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../baseUrl"

export const professionalApi = createApi({
    reducerPath: "professionalApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/professional`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const professional = JSON.parse(localStorage.getItem("professional") || "{}");
            if (professional && professional.token) {
                headers.set("authorization", `Bearer ${professional.token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["professionalApi"],
    endpoints: (builder) => {
        return {
            getProfessionalProfile: builder.query({
                query: () => {
                    return {
                        url: "/professional-profile",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["professionalApi"]
            }),
            registerProfessional: builder.mutation({
                query: professionalData => {
                    return {
                        url: "/register-professional",
                        method: "POST",
                        body: professionalData
                    }
                },
                invalidatesTags: ["professionalApi"]
            }),
            loginProfessional: builder.mutation({
                query: professionalData => {
                    return {
                        url: "/login-professional",
                        method: "POST",
                        body: professionalData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("professional", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["professionalApi"]
            }),
            logOutProfessional: builder.mutation({
                query: professionalData => {
                    return {
                        url: "/logout-professional",
                        method: "POST",
                        body: professionalData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("professional")
                    return data
                },
                invalidatesTags: ["professionalApi"]
            }),
            updateProfessionalProfile: builder.mutation({
                query: professionalData => {
                    return {
                        url: "/update-profile-professional/" + professionalData._id,
                        method: "PUT",
                        body: professionalData.fd
                    }
                },
                invalidatesTags: ["agencyApi"]
            }),

        }
    }
})

export const {
    useRegisterProfessionalMutation,
    useLoginProfessionalMutation,
    useLogOutProfessionalMutation,
    useGetProfessionalProfileQuery,
    useUpdateProfessionalProfileMutation
} = professionalApi
