import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { ErrorBoundary } from 'react-error-boundary'
import AdminProtected from './share/AdminProtected'
import CustomerProtected from './share/CustomerProtected'
import AgencyProtected from './share/AgencyProtected'
import ProfessionalProtected from './share/ProfessionalProtected'
import Agency_professionalProtected from './share/Agency-profeProtected'
import Loader from './share/Loader'


const Navbar = lazy(() => import('./components/customer/CustomerNav'))
const PlumberPage = lazy(() => import('./components/customer/PlumberPage'))
const ElectriciansPage = lazy(() => import('./components/customer/ElectriciansPage'))
const CleaningPage = lazy(() => import('./components/customer/CleaningPage'))
const HomePage = lazy(() => import('./components/customer/Home'))
const ServicePage = lazy(() => import('./components/customer/ServicePage'))
const Login = lazy(() => import('./components/customer/Login'))
const Register = lazy(() => import('./components/customer/Register'))
const CustomerProfile = lazy(() => import('./components/customer/CustomerProfile'))
const ServiceBookingPage = lazy(() => import('./components/customer/BookingService'))
const SuccessPage = lazy(() => import('./components/customer/SuccessPage'))
const ShowBookingsPage = lazy(() => import('./components/customer/ShowBookingPage'))

const AdminLayout = lazy(() => import('./components/admin/AdminLayout'))
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'))
const AddProfessional = lazy(() => import('./components/admin/AddProfessional'))
const CustomersPage = lazy(() => import('./components/admin/CustomersPage'))
const ProfessionalPage = lazy(() => import('./components/admin/ProfessonalPage'))
const AdminProfile = lazy(() => import('./components/admin/AdminProfile'))
const AgencyPage = lazy(() => import('./components/admin/AgencyPage'))
const NormalProfessionalAllBookings = lazy(() => import('./components/admin/ProfessionalBooking'))

const AgencyLayout = lazy(() => import('./components/agency/AgencyLayout'))
const AgencyDashboard = lazy(() => import('./components/agency/AgencyDashboard'))
const AgencyRegister = lazy(() => import('./components/agency/AgencyRegister'))
const AgencyProfile = lazy(() => import('./components/agency/AgencyProfile'))
const AgencyLogin = lazy(() => import('./components/agency/agencyLogin'))
const AddAgencyProfessional = lazy(() => import('./components/agency/Add_agencyProfessiona'))
const AllAgencyProfessionals = lazy(() => import('./components/agency/AllAgencyProfessionals'))
const AgencyProfessionalBooking = lazy(() => import('./components/agency/AllBookingsAgencyPro'))

const ProfessionalLayout = lazy(() => import('./components/proffesional/ProfessionalLayout'))
const ProfessionalDashboard = lazy(() => import('./components/proffesional/ProfessionalDashboard'))
const ProfessionalProfile = lazy(() => import('./components/proffesional/ProfessionalProfile'))
const ProfessionalRegister = lazy(() => import('./components/proffesional/ProfessionalRegister '))
const ProfessionalLogin = lazy(() => import('./components/proffesional/LoginProf'))
const DeactivationPage = lazy(() => import('./components/proffesional/Deactive'))
const ProfessionalBookings = lazy(() => import('./components/proffesional/ProfessionalBookings'))

const AgencyProfessionalNavbar = lazy(() => import('./components/agency-professional/AgencyProfessionalNavbar '))
const AgencyProfessionalDashboard = lazy(() => import('./components/agency-professional/AgencyProfessionalDashBoard'))
const Agency_ProfessionalProfile = lazy(() => import('./components/agency-professional/Agency_ProfessionalProfile'))
const AgencyProfessionalLogin = lazy(() => import('./components/agency-professional/LoginAgencyProfessional'))
const AgencyProfessionalBookingPanel = lazy(() => import('./components/agency-professional/AgencyProfessionalBookingPanel'))

const ErrorFallback = ({ error }) => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h1>Something went wrong!</h1>
    <p>{error?.message || "An unexpected error occurred."}</p>
  </div>
);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          {/* Customer Routes */}
          <Route
            path="/"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                  <Navbar />
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="all-plumbers" element={<PlumberPage />} />
            <Route path="all-electricians" element={<ElectriciansPage />} />
            <Route path="all-cleaning" element={<CleaningPage />} />
            <Route path="service-page" element={<ServicePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<CustomerProtected compo={<CustomerProfile />} />} />
            <Route path="booking/:id" element={<CustomerProtected compo={<ServiceBookingPage />} />} />
            <Route path="success" element={<SuccessPage />} />
            <Route path="show-booking" element={<CustomerProtected compo={< ShowBookingsPage />} />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                  <AdminLayout />
                </Suspense>
              </ErrorBoundary>
            }
          >
            <Route path="admin-dashboard" element={<AdminProtected compo={<AdminDashboard />} />} />
            <Route path="add-professional" element={<AdminProtected compo={<AddProfessional />} />} />
            <Route path="customer-page" element={<AdminProtected compo={<CustomersPage />} />} />
            <Route path="professional-page" element={<AdminProtected compo={<ProfessionalPage />} />} />
            <Route path="profile" element={<AdminProtected compo={<AdminProfile />} />} />
            <Route path="agency-page" element={<AgencyPage />} />
            <Route path="normal-professional-booking" element={<NormalProfessionalAllBookings />} />

          </Route>
          <Route path="admin/login" element={<AdminLogin />} />

          {/* Agency Routes */}
          <Route
            path="/agency"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                  <AgencyLayout />
                </Suspense>
              </ErrorBoundary>
            }
          >
            <Route path="agency-dashboard" element={<AgencyProtected compo={<AgencyDashboard />} />} />
            <Route path="add-agency-professional" element={<AgencyProtected compo={<AddAgencyProfessional />} />} />
            <Route path="professionals" element={<AgencyProtected compo={<AllAgencyProfessionals />} />} />
            <Route path="profile" element={<AgencyProtected compo={<AgencyProfile />} />} />
            <Route path="professional-booking" element={<AgencyProtected compo={<AgencyProfessionalBooking />} />} />
          </Route>
          <Route path="/agency/register" element={<AgencyRegister />} />
          <Route path="agency/login" element={<AgencyLogin />} />

          {/* Professional Routes */}
          <Route
            path="/professional"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                  <ProfessionalLayout />
                </Suspense>
              </ErrorBoundary>
            }
          >
            <Route path="professional-dashboard" element={<ProfessionalProtected compo={<ProfessionalDashboard />} />} />
            <Route path="professional-profile" element={<ProfessionalProtected compo={<ProfessionalProfile />} />} />
            <Route path="professional-bookings" element={<ProfessionalProtected compo={<ProfessionalBookings />} />} />
          </Route>
          <Route path="deactive" element={<DeactivationPage />} />
          <Route path="professional-register" element={<ProfessionalRegister />} />
          <Route path="professional-login" element={<ProfessionalLogin />} />

          {/* Agency Professional Routes */}
          <Route
            path="/agency-professional"
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                  <AgencyProfessionalNavbar />
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            }
          >
            <Route path="dashboard" element={<Agency_professionalProtected compo={<AgencyProfessionalDashboard />} />} />
            <Route path="profile" element={<Agency_professionalProtected compo={<Agency_ProfessionalProfile />} />} />
            <Route path="booking-panel" element={<Agency_professionalProtected compo={<AgencyProfessionalBookingPanel />} />} />
          </Route>
          <Route path="agency-professional-login" element={<AgencyProfessionalLogin />} />

          {/* Fallback Route */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
