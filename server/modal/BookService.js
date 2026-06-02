const mongoose = require("mongoose")

const bookServiceSchema = new mongoose.Schema({
    customerId: { type: mongoose.Types.ObjectId, ref: "customer" },
    professionalId: { type: mongoose.Types.ObjectId, ref: "professional" },
    agencyProfessionalId: { type: mongoose.Types.ObjectId, ref: "agency_professional" },
    name: { type: String },
    email: { type: String },
    desc: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['accept', 'reject', 'pending'],
        default: 'pending',
    },




}, { timestamps: true })

module.exports = mongoose.model("bookService", bookServiceSchema)
