const router = require("express").Router()
const bookingController = require("../controller/booking.controller")
const { customerProtected, adminProtected, agencyProfessionalProtected } = require("../middleware/auth.middleware")

router
    .post("/booking-service", customerProtected, bookingController.bookService)
    .get("/customer-bookings", customerProtected, bookingController.getAllCustomerBookings)
    .get("/professional-bookings", adminProtected, bookingController.getAllProfessionalBooking)
    .get("/agencyprofessional-bookings", bookingController.getAllAgencyProfessionalBooking)

    // professional
    .get("/pro-booking", bookingController.getProfessionalBooking)
    .get("/agencypro-booking", bookingController.getAgencyProfessionalBooking)
    .put("/accept-bookings/:id", bookingController.isAcceptAgencyProfessionalRequest)
    .put("/reject-bookings/:id", bookingController.isRejectRequestAgencyProfessional)
    .put("/cancel-bookings/:id", bookingController.isCancelRequestAgencyProfessional)


// professional-bookings

module.exports = router

