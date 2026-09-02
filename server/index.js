const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

// Intercept console.error to log to error.log
const originalConsoleError = console.error;
console.error = function (...args) {
    originalConsoleError.apply(console, args);
    const logMessage = args.map(arg => 
        arg instanceof Error ? arg.stack : (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg))
    ).join(" ");
    try {
        // Vercel's filesystem is read-only except /tmp
        const logDir = process.env.VERCEL ? '/tmp' : __dirname;
        fs.appendFileSync(path.join(logDir, "error.log"), `[${new Date().toISOString()}] ${logMessage}\n\n`);
    } catch (e) {
        originalConsoleError("Failed to write to error.log", e);
    }
};

const app = express()

// Middleware
// CORS configuration - use specific client URL in production for security
const allowedOrigins = process.env.CLIENT_URL 
    ? [process.env.CLIENT_URL, "http://localhost:5173"] 
    : true;
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// MongoDB connection with caching for serverless (Vercel)
let isConnected = false;

// CRITICAL for serverless: disable buffering so operations fail immediately
// instead of waiting 10s when not connected
mongoose.set('bufferCommands', false);

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) return;
    // Reset flag in case previous connection was lost
    isConnected = false;
    try {
        const mongoUri = process.env.MONGO_URL 
            || "mongodb+srv://olx-user:hRwJZKPhgqQyKN5O@cluster0.yjpqbyl.mongodb.net/on-demand-service";

        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
        });
        isConnected = conn.connections[0].readyState === 1;
        console.log("MONGO CONNECTED 🌻");
    } catch (err) {
        isConnected = false;
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

// Ensure DB is connected before any route runs
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ message: "Database connection failed", error: err.message });
    }
});

// Health check route - use this to debug on Vercel
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        mongoState: mongoose.connection.readyState,
        // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
        env: {
            hasMongoUrl: !!process.env.MONGO_URL,
            hasJwtKey: !!process.env.JWT_KEY,
            hasClientUrl: !!process.env.CLIENT_URL,
            nodeEnv: process.env.NODE_ENV
        }
    });
});

// Routes
app.use("/api/customer", require("./routes/customer.route"))
app.use("/api/admin", require("./routes/admin.route"))
app.use("/api/agency", require("./routes/agency.route"))
app.use("/api/professional", require("./routes/professional.route"))
app.use("/api/agency-professional", require("./routes/agency_professional.route"))
app.use("/api/booking", require("./routes/booking.route"))

// Fallback Route
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not found" })
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

// Fallback for local development testing
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT} 🏃‍♂️`))
}

// CRITICAL FOR VERCEL: Export the app instance
module.exports = app;