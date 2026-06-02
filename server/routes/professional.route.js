const router = require("express").Router()
const professionalController = require("../controller/professional.controller")
const { professionalProtected } = require("../middleware/auth.middleware")

router
    .post("/register-professional", professionalController.registerProfessional)
    .post("/login-professional", professionalController.loginProfessional)
    .post("/logout-professional", professionalController.logOutProfessional)
    .put("/update-profile-professional/:id", professionalProtected, professionalController.updateProfessionalProfile)
    .get("/professional-profile", professionalProtected, professionalController.professionalProflie)



module.exports = router
