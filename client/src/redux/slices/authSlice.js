import { createSlice } from "@reduxjs/toolkit";
import { AdminApi } from "../apis/adminApi";
import { customerApi } from "../apis/customerApi";
import { agencyApi } from "../apis/agencyApi";
import { professionalApi } from "../apis/professionalApi";
import { agency_professionalApi } from "../apis/agency_Professioal";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")),
        customer: JSON.parse(localStorage.getItem("customer")),
        agency: JSON.parse(localStorage.getItem("agency")),
        professional: JSON.parse(localStorage.getItem("professional")),
        agency_professional: JSON.parse(localStorage.getItem("agency_professional")),
    },
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(AdminApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
                state.admin = payload;
                state.loading = false;
            })
            .addMatcher(AdminApi.endpoints.logOutAdmin.matchFulfilled, (state) => {
                state.admin = null;
            })
            .addMatcher(customerApi.endpoints.loginCustomer.matchFulfilled, (state, { payload }) => {
                state.customer = payload;
                state.loading = false;
            })
            .addMatcher(customerApi.endpoints.logOutCustomer.matchFulfilled, (state) => {
                state.customer = null;
            })
            .addMatcher(customerApi.endpoints.updateCustomeryProfile.matchFulfilled, (state, { payload }) => {
                state.customer = payload;
            })
            .addMatcher(agencyApi.endpoints.LoginAgency.matchFulfilled, (state, { payload }) => {
                state.agency = payload;
                state.loading = false;
            })
            // Agency logout success
            .addMatcher(agencyApi.endpoints.LogOutAgency.matchFulfilled, (state) => {
                state.agency = null;
            })

            // normal professional
            .addMatcher(professionalApi.endpoints.loginProfessional.matchFulfilled, (state, { payload }) => {
                state.professional = payload;
                state.loading = false;
            })
            .addMatcher(professionalApi.endpoints.logOutProfessional.matchFulfilled, (state) => {
                state.professional = null;
            })
            // agency professional
            .addMatcher(agency_professionalApi.endpoints.loginAgencyProfessional.matchFulfilled, (state, { payload }) => {
                state.agency_professional = payload;
                state.loading = false;
            })
            .addMatcher(agency_professionalApi.endpoints.logOutAgencyProfessional.matchFulfilled, (state) => {
                state.agency_professional = null;
            })

});

export default authSlice.reducer;
