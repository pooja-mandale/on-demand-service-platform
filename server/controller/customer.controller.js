const Customer = require("../modal/Customer")
const validator = require("validator")
const { checkEmpty } = require("../utils/checkEmpty")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Professional = require("../modal/Professional")
const agency_professional = require("../modal/agency_professional")
const BookService = require("../modal/BookService")
const fs = require("fs")
const path = require("path")



exports.registerCustomer = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body

        const { isError, error } = checkEmpty({ name, email, password })
        if (isError) {
            return res.status(401).json({ message: "All Feild Require", error })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        const result = await Customer.findOne({ email })
        if (result) {
            return res.status(409).json({ message: "email already registered" })
        }
        const hash = await bcrypt.hash(password, 10)
        await Customer.create({ ...req.body, password: hash })

        res.json({ message: "register success" })
    } catch (error) {
        console.error("Error register customer:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.loginCustomer = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await Customer.findOne({ email })
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
        const customer = jwt.sign({ name: result.name, _id: result._id, }, process.env.JWT_KEY, { expiresIn: "3650d" })
        res.cookie("customer", customer, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 3650 * 24 * 60 * 60 * 1000 })

        res.json({
            message: "login success", result: {
                _id: result._id,
                name: result.name,
                email: result.email,
                image: result.image,
                token: customer
            }
        })
    } catch (error) {
        console.error("Error login customer:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.logOutCustomer = asyncHandler(async (req, res) => {
    try {
        const { customer } = req.body || {}
        res.clearCookie("customer")
        res.json({ message: "Customer LogOut Success", result: customer })
    } catch (error) {
        console.error("Error logOut customer:", error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})
exports.updateCustomerProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, oldimage, removeImage } = req.body;

        let updateData = { name, email };

        // Handle image removal
        if (removeImage === "true") {
            if (oldimage) {
                const oldFileName = path.basename(oldimage);
                const oldFilePath = path.join(__dirname, "../uploads", oldFileName);
                if (fs.existsSync(oldFilePath)) {
                    try {
                        fs.unlinkSync(oldFilePath);
                    } catch (unlinkErr) {
                        console.error("Failed to delete old image:", unlinkErr);
                    }
                }
            }
            updateData.image = "";
        } 
        // Handle new image upload
        else if (req.file) {
            if (oldimage) {
                const oldFileName = path.basename(oldimage);
                const oldFilePath = path.join(__dirname, "../uploads", oldFileName);
                if (fs.existsSync(oldFilePath)) {
                    try {
                        fs.unlinkSync(oldFilePath);
                    } catch (unlinkErr) {
                        console.error("Failed to delete old image:", unlinkErr);
                    }
                }
            }
            const localUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            updateData.image = localUrl;
        }

        const result = await Customer.findByIdAndUpdate(id, updateData, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Profile updated successfully', result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
}

exports.getAllPlumbers = async (req, res) => {
    try {
        const result = await Professional.find({ categories: "plumber", isActiveAccount: true });

        // if (result.length === 0) {
        //     return res.status(404).json({ message: "No plumbers found." });
        // }

        res.json({ message: "fetch All Plumber's Success", result })
    } catch (error) {
        console.error("Error fetching plumbers:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
exports.getAllElectricians = async (req, res) => {
    try {
        const result = await Professional.find({ categories: "electrician", isActiveAccount: true });

        // if (result.length === 0) {
        //     return res.status(401).json({ message: "No electricians found." });
        // }

        res.json({ message: "fetch All electrician's Success", result });
    } catch (error) {
        console.error("Error fetching electricians:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
exports.getAllCleaners = async (req, res) => {
    try {
        const result = await Professional.find({ categories: "cleaner", isActiveAccount: true });

        // if (result.length === 0) {
        //     return res.status(401).json({ message: "No cleaners found." });
        // }

        res.json({ message: "fetch All Ceaner Success", result });
    } catch (error) {
        console.error("Error fetching cleaners:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
exports.customerProflie = async (req, res) => {
    console.log(req.user);

    try {
        const result = await Customer.findOne({ _id: req.user })

        res.json({ message: "Success", result });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getAllAgencyPlumbers = async (req, res) => {
    try {
        const result = await agency_professional.find({ categories: "plumber", isActiveAccount: true })

        // if (result.length === 0) {
        //     return res.status(401).json({ message: "No plumbers found." });
        // }

        res.json({ message: "fetch All agency Plumber's Success", result })
    } catch (error) {
        console.error("Error fetching plumbers:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
exports.getAllAgencyElectricians = async (req, res) => {
    try {
        const result = await agency_professional.find({ categories: "electrician", isActiveAccount: true });

        // if (result.length === 0) {
        //     return res.status(401).json({ message: "No electricians found." });
        // }

        res.json({ message: "fetch All electrician's Success", result });
    } catch (error) {
        console.error("Error fetching electricians:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
exports.getAllAgencyCleaners = async (req, res) => {
    try {
        const result = await agency_professional.find({ categories: "cleaner", isActiveAccount: true });

        // if (result.length === 0) {
        //     return res.status(401).json({ message: "No cleaners found." });
        // }

        res.json({ message: "fetch All Ceaner Success", result });
    } catch (error) {
        console.error("Error fetching cleaners:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



















