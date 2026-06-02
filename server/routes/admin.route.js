const router = require("express").Router()
const AdminController = require("../controller/admin.controller")
const { adminProtected } = require("../middleware/auth.middleware")

router
    .post("/register-admin", AdminController.registerAdmin)
    .post("/login-admin", AdminController.loginAdmin)
    .post("/logout-admin", AdminController.logOutAdmin)
    .get("/get-customer", adminProtected, AdminController.getAllCustomer)
    .get("/get-agency", adminProtected, AdminController.getAllAgency)
    .get("/admin-profile", adminProtected, AdminController.adminProflie)
    .post("/add-professional", adminProtected, AdminController.addProfessional)
    .get("/get-professional", adminProtected, AdminController.getAllProfessionals)
    .put("/deactive-account/:id", adminProtected, AdminController.isDeActiveAccountProfessional)
    .put("/active-account/:id", adminProtected, AdminController.isActiveAccountProfessional)



module.exports = router