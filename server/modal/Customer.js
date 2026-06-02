const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    customerId: { type: mongoose.Types.ObjectId, ref: "customer" },
    professionalId: { type: mongoose.Types.ObjectId, ref: "professional" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String }
}, { timestamps: true })

module.exports = mongoose.model("customer", customerSchema)


