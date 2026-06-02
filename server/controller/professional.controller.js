const validator = require("validator")
const { checkEmpty } = require("../utils/checkEmpty")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { upload } = require("../utils/upload")
const Professional = require("../modal/Professional")
const fs = require("fs")
const path = require("path")
exports.registerProfessional = asyncHandler(async (req, res) => {
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
            res.json({ message: "professional registered successfully" });
        });
    } catch (error) {
        console.error("Error register professional:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})

exports.loginProfessional = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await Professional.findOne({ email })
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
        const professional = jwt.sign({ name: result.name, _id: result._id }, process.env.JWT_KEY, { expiresIn: "3650d" })
        res.cookie("professional", professional, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 3650 * 24 * 60 * 60 * 1000 })

        res.json({
            message: "professional login success", result: {
                _id: result._id,
                name: result.name
            }
        })
    } catch (error) {
        console.error("Error login customer:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})

exports.logOutProfessional = asyncHandler(async (req, res) => {
    try {
        const { Professional } = req.body
        res.clearCookie("Professional")
        res.json({ message: "Professional LogOut Success", result: Professional })

    } catch (error) {
        console.error("Error logOut professional:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.updateProfessionalProfile = async (req, res) => {
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
                await Professional.findByIdAndUpdate(id, { ...req.body, image: localUrl })
            } else {
                await Professional.findByIdAndUpdate(id, req.body)
            }
            res.json({ message: "profile Updated Successfully" })

        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.professionalProflie = async (req, res) => {
    console.log(req.user)

    try {
        const result = await Professional.findOne({ _id: req.user })
        res.json({ message: "Success", result });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}