const validator = require("validator")
const { checkEmpty } = require("../utils/checkEmpty")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Agency = require("../modal/Agency")
const agency_professional = require("../modal/agency_professional")
const sendEmail = require("../utils/email")
const { upload } = require("../utils/upload")
const path = require("path")


exports.registerAgency = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, address, phone, description } = req.body;

        // Validate required fields
        const { isError, error } = checkEmpty({ name, email, password, address, phone, description });
        if (isError) {
            return res.status(400).json({ message: "All fields are required", error });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingAgency = await Agency.findOne({ email });
        if (existingAgency) {
            return res.status(409).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAgency = await Agency.create({
            name,
            email,
            password: hashedPassword,
            address,
            phone,
            description
        });
        res.json({ message: "agencyAdmin registered successfully", data: newAgency });
    } catch (error) {
        console.error("Error registering Professional:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.loginAgency = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, address, phone, description } = req.body
        const result = await Agency.findOne({ email })
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
        const agency = jwt.sign({ name: result.name, _id: result._id }, process.env.JWT_KEY, { expiresIn: "3650d" })
        res.cookie("agency", agency, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 3650 * 24 * 60 * 60 * 1000 })

        res.json({
            message: "agency login success", result: {
                _id: result._id,
                name: result.name,
                email: result.email,
                phone: result.phone,
                address: result.address,
                description: result.description,

            }
        })
    } catch (error) {
        console.error("Error login Professional:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.logOutAgency = asyncHandler(async (req, res) => {
    try {
        const { agency } = req.body || {}
        res.clearCookie("agency")
        res.json({ message: "Admin LogOut Success", result: agency })
    } catch (error) {
        console.error("Error logOut agency:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.addAgencyProfessional = asyncHandler(async (req, res) => {
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


            const existingProfessional = await agency_professional.findOne({ email });
            if (existingProfessional) {
                return res.status(409).json({ message: "Email already registered" });
            }

            const localUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

            const hash = await bcrypt.hash(password, 10);

            await agency_professional.create({
                ...req.body,
                image: localUrl,
                password: hash,
            });
            const emailContent = `
            <h1>Welcome, ${name}!</h1>
            <p>Thank you for registering as an agency professional on our platform.</p>
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

            res.json({ message: "agency_professional registered successfully" });
        });
    } catch (error) {
        console.error("Error AddAgencyProfessional agency:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.getAllAgencyProfessional = asyncHandler(async (req, res) => {
    try {
        const result = await agency_professional.find(req.body)
        res.json({ message: "agency_professional Fetch Success", result })
    } catch (error) {
        console.error("Error getAllAgencyProfessional Professional:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.updateAgencyProfile = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, phone, address, description } = req.body

        if (!name && !email && !phone && !address && !description) {
            return res.status(400).json({ message: 'At least one field must be provided.' });
        }
        const result = await Agency.findByIdAndUpdate(id, req.body, { new: true })

        if (!result) {
            return res.status(404).json({ message: 'Agency not found' });
        }
        return res.status(200).json({ message: 'Profile updated successfully', result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


exports.isActiveAccountAgencyProfessional = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        if (!id) {
            res.status(400).json({ message: "agency Professional ID is required" })
        }

        const result = await agency_professional.findByIdAndUpdate(id, { isActiveAccount: true })

        if (!result) {
            res.status(404).json({ message: "Professional not found" })
        }

        res.json({ message: "Professional activation successful", result })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.isDeActiveAccountAgencyProfessional = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const result = await agency_professional.findByIdAndUpdate(id, { isActiveAccount: false })
        res.json({ message: "agency professional active Success", result })
    } catch (error) {
        console.error("Error deactivating professional account:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }

})

