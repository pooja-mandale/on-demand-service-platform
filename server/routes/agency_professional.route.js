const router = require("express").Router()
const agencyProfessionalController = require("../controller/agency-professionalcontroller")
const { agencyProfessionalProtected } = require("../middleware/auth.middleware")

router
    .post("/login-agency-professional", agencyProfessionalController.loginAgency_Professional)
    .post("/logout-agency-professional", agencyProfessionalController.logOutAgency_Professional)
    .put("/update-profile-agency-profssional/:id", agencyProfessionalProtected, agencyProfessionalController.updateAgencyProfessionalProfile)
    .get("/get-agency-professional-profile", agencyProfessionalProtected, agencyProfessionalController.agencyProfessionalProflie)



module.exports = router