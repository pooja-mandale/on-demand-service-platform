const validator = require("validator")
const { checkEmpty } = require("../utils/checkEmpty")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../modal/Admin")
const Customer = require("../modal/Customer")
const Agency = require("../modal/Agency")
const Professional = require("../modal/Professional")
const { upload } = require("../utils/upload")
const sendEmail = require("../utils/email")
const BookService = require("../modal/BookService")
const path = require("path")
exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const { isError, error } = checkEmpty({ name, email, password });
        if (isError) {
            return res.status(400).json({ message: "All fields are required", error });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.create({ ...req.body, password: hashedPassword });

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Error registering admin:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await Admin.findOne({ email })
        const { isError, error } = checkEmpty({ email, password })
        if (isError) {
            return res.status(401).json({ message: "All Feild Require", error })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        if (!result) {
            return res.status(401).json({ message: "email not found" })
        }
        const isVerify = await bcrypt.compare(password, result.password)
        if (!isVerify) {
            return res.status(401).json({ message: "password do not match" })
        }
        const admin = jwt.sign({ name: result.name, _id: result._id }, process.env.JWT_KEY, { expiresIn: "3650d" })
        res.cookie("admin", admin, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 3650 * 24 * 60 * 60 * 1000 })

        res.json({
            message: "Admin login success", result: {
                _id: result._id,
                name: result.name,
                email: result.email,
            }
        })
    } catch (error) {
        console.error("Error login admin:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.logOutAdmin = asyncHandler(async (req, res) => {
    try {
        const { admin } = req.body
        res.clearCookie("admin")
        res.json({ message: "Admin LogOut Success", result: admin })
    } catch (error) {
        console.error("Error logOut admin:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.addProfessional = asyncHandler(async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "Unable to upload file" });
            }

            const { name, email, phone, address, categories, experience, price } = req.body;

            const { isError, error } = checkEmpty({ name, email, phone, address, categories, experience, price });
            if (isError) {
                return res.status(401).json({ message: "All fields are required", error });
            }

            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: "Invalid email" });
            }

            const password = name.slice(0, 2).toLowerCase() + phone.slice(0, 2);
            console.log(password)


            const existingProfessional = await Professional.findOne({ email });
            if (existingProfessional) {
                return res.status(409).json({ message: "Email already registered" });
            }

            const localUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

            const hash = await bcrypt.hash(password, 10);

            await Professional.create({
                ...req.body,
                image: localUrl,
                password: hash,
            });
            const emailContent = `
                <h1>Welcome, ${name}!</h1>
                <p>Thank you for registering as a professional on our platform.</p>
                <p>Your auto-generated password is: <strong>${password}</strong></p>
                <p>you can login with this password..!</p>
            `

            try {
                await sendEmail({
                    to: email,
                    subject: "Welcome to Our Platform!",
                    message: emailContent,
                });
            } catch (mailError) {
                console.error("Failed to send welcome email:", mailError);
            }

            res.json({ message: "Professional registered successfully" });
        });
    } catch (error) {
        console.error("Error addProfessinal admin:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.getAllCustomer = asyncHandler(async (req, res) => {
    try {
        const result = await Customer.find(req.body)
        res.json({ message: "customer Fetch Success", result })

    } catch (error) {
        console.error("Error getAllUser admin:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.getAllAgency = asyncHandler(async (req, res) => {
    try {

        const result = await Agency.find(req.body)
        res.json({ message: "Agency Fetch Success", result })
    } catch (error) {
        console.error("Error getAllAgency admin:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.getAllProfessionals = asyncHandler(async (req, res) => {
    try {

        const result = await Professional.find(req.body)
        res.json({ message: "Professional Fetch Success", result })
    } catch (error) {
        console.error("Error GetAllProfessional admin:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.isActiveAccountProfessional = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        if (!id) {
            res.status(400).json({ message: "Professional ID is required" })
        }

        const result = await Professional.findByIdAndUpdate(id, { isActiveAccount: true })

        if (!result) {
            res.status(404).json({ message: "Professional not found" })
        }

        res.json({ message: "Professional activation successful", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.isDeActiveAccountProfessional = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const result = await Professional.findByIdAndUpdate(id, { isActiveAccount: false })
        res.json({ message: "professional active Success", result })
    } catch (error) {
        console.error("Error deactivating professional account:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }

})
exports.adminProflie = async (req, res) => {
    console.log(req.user)

    try {
        const result = await Admin.findOne({ _id: req.user })

        res.json({ message: "get Admin Profile Success", result });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
exports.getAllBookings = async (req, res) => {
    try {
        const result = await BookService.find()
        res.json({ message: "booking fetch Success", result })
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message })
    }
}





















