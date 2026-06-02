const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
// Middleware
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/customer", require("./routes/customer.route"))
app.use("/api/admin", require("./routes/admin.route"))
app.use("/api/agency", require("./routes/agency.route"))
app.use("/api/professional", require("./routes/professional.route"))
app.use("/api/agency-professional", require("./routes/agency_professional.route"))
app.use("/api/booking", require("./routes/booking.route"))


app.use("*", (req, res) => {
    res.status(404).json({ message: "Resours Not found" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "SERVER ERROR ", error: err.message })
})
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

mongoose.connect(process.env.MONGO_URL)
    .catch(err => console.error("Initial MongoDB connection error:", err));

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED 🌻")
    app.listen(process.env.PORT, () => console.log("SERVER RUNNING 🏃‍♂️"))
});

mongoose.connection.on("error", err => {
    console.error("MongoDB runtime connection error:", err);
});
