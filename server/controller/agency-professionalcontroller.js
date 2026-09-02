const validator = require("validator")
const { checkEmpty } = require("../utils/checkEmpty")
const getCookieOptions = require("../utils/cookieOptions")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const agency_professional = require("../modal/agency_professional")
const { upload } = require("../utils/upload")
const fs = require("fs")
const path = require("path")
exports.registerAgency_Professional = asyncHandler(async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "Unable to upload file" });
            }

            const { name, email, phone, address, categories, experience, price, password } = req.body;

            const { isError, error } = checkEmpty({ name, email, phone, address, categories, experience, price, password });
            if (isError) {
                return res.status(401).json({ message: "All fields are required", error });
            }

            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: "Invalid email" });
            }
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
            res.json({ message: "agency_professional registered successfully" });
        });
    } catch (error) {
        console.error("Error register professional:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.loginAgency_Professional = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await agency_professional.findOne({ email })
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
        if (result.isActiveAccount === false) {
            return res.status(401).json({ message: "Account Deactive By the Admin" })
        }
        const agency_Professional = jwt.sign({ name: result.name, _id: result._id }, process.env.JWT_KEY, { expiresIn: "3650d" })
        res.cookie("agency_professional", agency_Professional, getCookieOptions())

        res.json({
            message: "agency_Professional login success", result: {
                _id: result._id,
                name: result.name,
                email: result.email,
                token: agency_Professional
            }
        })

    } catch (error) {
        console.error("Error loging Professional:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})

exports.logOutAgency_Professional = asyncHandler(async (req, res) => {
    try {
        const { agency_professional } = req.body || {}
        res.clearCookie("agency_professional", getCookieOptions())
        res.json({ message: "agency_professional LogOut Success", result: agency_professional })
    } catch (error) {
        console.error("Error logOut Professional:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.updateAgencyProfessionalProfile = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: "Unable to upload file" });
            }
            const { id } = req.params
            if (req.file) {
                if (req.body.oldiamge) {
                    const oldFileName = path.basename(req.body.oldiamge)
                    const oldFilePath = path.join(__dirname, "../uploads", oldFileName)
                    if (fs.existsSync(oldFilePath)) {
                        try {
                            fs.unlinkSync(oldFilePath)
                        } catch (unlinkErr) {
                            console.error("Failed to delete old local image:", unlinkErr)
                        }
                    }
                }
                const localUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
                await agency_professional.findByIdAndUpdate(id, { ...req.body, image: localUrl })
            } else {
                await agency_professional.findByIdAndUpdate(id, req.body)
            }
            res.json({ message: "profile Updated Successfully" })

        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
}
exports.agencyProfessionalProflie = async (req, res) => {
    try {
        const result = await agency_professional.findOne({ _id: req.user })

        res.json({ message: "get profile Success", result })
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

