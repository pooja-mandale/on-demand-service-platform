const router = require("express").Router()
const customerController = require("../controller/customer.controller")
const { customerProtected } = require("../middleware/auth.middleware")
const { upload } = require("../utils/upload")

router
    .post("/register-customer", customerController.registerCustomer)
    .post("/login-customer", customerController.loginCustomer)
    .post("/logout-customer", customerController.logOutCustomer)

    .get("/get-plumbers", customerController.getAllPlumbers)
    .get("/get-cleaners", customerController.getAllCleaners)
    .get("/get-electricians", customerController.getAllElectricians)
    .get("/get-agencyplumbers", customerController.getAllAgencyPlumbers)
    .get("/get-agencycleaners", customerController.getAllAgencyCleaners)
    .get("/get-agencyelectricians", customerController.getAllAgencyElectricians)

    .put("/update-profile-customer/:id", customerProtected, upload, customerController.updateCustomerProfile)
    .get("/fetchprofile", customerProtected, customerController.customerProflie)

module.exports = router