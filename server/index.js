const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()

// Middleware
// NOTE: For production on Vercel, it's highly recommended to replace true 
// with your specific live frontend Vercel URL to avoid CORS security issues.
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api/customer", require("./routes/customer.route"))
app.use("/api/admin", require("./routes/admin.route"))
app.use("/api/agency", require("./routes/agency.route"))
app.use("/api/professional", require("./routes/professional.route"))
app.use("/api/agency-professional", require("./routes/agency_professional.route"))
app.use("/api/booking", require("./routes/booking.route"))

// Fallback Route
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not found" }) // Fixed typo "Resours"
})

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ message: "SERVER ERROR", error: err.message })
})

// Process monitoring
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

// Database Connection 
// In a serverless environment, initiate the connection immediately.
// Mongoose buffers operations internally, so routes can safely hit models right away.
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MONGO CONNECTED 🌻"))
    .catch(err => console.error("Initial MongoDB connection error:", err));

// Fallback for local development testing
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT} 🏃‍♂️`))
}

// CRITICAL FOR VERCEL: Export the app instance
module.exports = app;