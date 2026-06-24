const jwt = require("jsonwebtoken")

exports.adminProtected = (req, res, next) => {
    const authHeader = req.headers.authorization
    const admin = (authHeader && authHeader.startsWith("Bearer ")) ? authHeader.split(" ")[1] : req.cookies.admin
    console.log(req.cookies)

    if (!admin) {
        return res.status(401).json({ message: "No Cookie or Token Found" })
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
    const authHeader = req.headers.authorization;
    const customer = (authHeader && authHeader.startsWith("Bearer ")) ? authHeader.split(" ")[1] : req.cookies.customer;

    console.log(req.cookies); // Log cookies for debugging

    if (!customer) {
        return res.status(401).json({ message: "No cookie or token found" });
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
    const authHeader = req.headers.authorization
    const professional = (authHeader && authHeader.startsWith("Bearer ")) ? authHeader.split(" ")[1] : req.cookies.professional
    console.log(req.cookies)

    if (!professional) {
        return res.status(401).json({ message: "No Cookie or Token Found" })
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
    const authHeader = req.headers.authorization
    const agency = (authHeader && authHeader.startsWith("Bearer ")) ? authHeader.split(" ")[1] : req.cookies.agency
    console.log(req.cookies)

    if (!agency) {
        return res.status(401).json({ message: "No Cookie or Token Found" })
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
    const authHeader = req.headers.authorization
    const agency_professional = (authHeader && authHeader.startsWith("Bearer ")) ? authHeader.split(" ")[1] : req.cookies.agency_professional
    console.log(req.cookies)

    if (!agency_professional) {
        return res.status(401).json({ message: "No Cookie or Token Found" })
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