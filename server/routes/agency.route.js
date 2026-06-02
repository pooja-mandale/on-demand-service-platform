const router = require("express").Router()
const agencyController = require("../controller/agency.controller")
const { agencyProtected } = require("../middleware/auth.middleware")

router
    .post("/register-agency", agencyController.registerAgency)
    .post("/login-agency", agencyController.loginAgency)
    .post("/logout-agency", agencyController.logOutAgency)
    .post("/add-agency-professional", agencyProtected, agencyController.addAgencyProfessional)
    .get("/get-agency-professional", agencyProtected, agencyController.getAllAgencyProfessional)
    .put("/update-profile-agency/:id", agencyProtected, agencyController.updateAgencyProfile)
    .put("/active-agency-professional/:id", agencyProtected, agencyController.isActiveAccountAgencyProfessional)
    .put("/deactive-agency-professional/:id", agencyProtected, agencyController.isDeActiveAccountAgencyProfessional)



module.exports = router