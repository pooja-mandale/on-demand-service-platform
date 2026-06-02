import { configureStore } from "@reduxjs/toolkit";
import { customerApi } from "./apis/customerApi";
import { AdminApi } from "./apis/adminApi";
import { agencyApi } from "./apis/agencyApi";
import { professionalApi } from "./apis/professionalApi";
import authSlice from "./slices/authSlice";
import { agency_professionalApi } from "./apis/agency_Professioal";
import { bookingApi } from "./apis/bookingApi";


const reduxStore = configureStore({
    reducer: {
        [customerApi.reducerPath]: customerApi.reducer,
        [AdminApi.reducerPath]: AdminApi.reducer,
        [agencyApi.reducerPath]: agencyApi.reducer,
        [professionalApi.reducerPath]: professionalApi.reducer,
        [agency_professionalApi.reducerPath]: agency_professionalApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        auth: authSlice
    },
    middleware: dev => [...dev(), customerApi.middleware, AdminApi.middleware, agencyApi.middleware, professionalApi.middleware, agency_professionalApi.middleware, bookingApi.middleware]
})

export default reduxStore


