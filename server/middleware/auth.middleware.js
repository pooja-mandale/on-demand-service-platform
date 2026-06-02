const jwt = require("jsonwebtoken")

exports.adminProtected = (req, res, next) => {
    const admin = req.cookies.admin
    console.log(req.cookies)

    if (!admin) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    jwt.verify(admin, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "JWT error", error: error.message })
        }
        req.user = decode._id
        next()
    })
}
exports.customerProtected = (req, res, next) => {
    const { customer } = req.cookies;

    console.log(req.cookies); // Log cookies for debugging

    if (!customer) {
        return res.status(401).json({ message: "No cookie found" });
    }

    jwt.verify(customer, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.user = decode; // Attach the decoded user data to req.user
        console.log("Decoded user:", req.user);

        next(); // Proceed only after successful verification
    });
};

exports.professionalProtected = (req, res, next) => {
    const { professional } = req.cookies
    console.log(req.cookies)

    if (!professional) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    jwt.verify(professional, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode._id
        next()
    })
}
exports.agencyProtected = (req, res, next) => {
    const { agency } = req.cookies
    console.log(req.cookies)

    if (!agency) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    jwt.verify(agency, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })
}
exports.agencyProfessionalProtected = (req, res, next) => {
    const { agency_professional } = req.cookies
    console.log(req.cookies)

    if (!agency_professional) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    jwt.verify(agency_professional, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "Invalid Token" })
        }
        req.user = decode._id
        next()
    })
}